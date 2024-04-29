from quart import Quart, jsonify, request
from quart_cors import cors
from functools import wraps
from datetime import datetime, timedelta
import aiohttp
from bs4 import BeautifulSoup

app = Quart(__name__)
app = cors(app, allow_origin="https://cyvstool.ajlo.org")


async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def login(session, url, login_data):
    async with session.post(url, data=login_data) as response:
        text = await response.text()
        soup = BeautifulSoup(text, 'html.parser')
        # 假設登入成功後，頁面會包含用戶名字（例如在某個 id 為 'User_Name' 的元素中）
        user_name_element = soup.find(id='User_Name')
        if user_name_element and user_name_element.text:
            # 如果找到含有用戶名的元素，則認為登入成功
            return text, True
        else:
            # 否則認為登入失敗
            return text, False
# 定義解析缺勤信息的函數
async def parse_absence_data(html):
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', id='GrdStd2')
    absence_data = {}
    if table:
        rows = table.find_all('tr', class_='tblContent')
        for row in rows:
            cells = row.find_all('td')
            date = cells[0].get_text(strip=True)  # 獲取日期
            absences = [cell.get_text(strip=True) for cell in cells[1:]]  # 獲取當天的缺勤信息
            absence_data[date] = absences
    return absence_data

# 定义解析课表信息的函数
def parse_time_string(teach_time):
    # 移除"每週:"这部分并分割每个时间段
    time_slots = teach_time.replace("每週:", "").split(',')
    # 解析每个时间段
    parsed_slots = []
    for slot in time_slots:
        try:
            day, period = map(int, slot.split('-'))
            parsed_slots.append((day, period))
        except ValueError:
            continue  # 如果解析错误，跳过这个时间段
    return parsed_slots

async def parse_schedule_data(html):
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', id='GrdStd1')

    weekdays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    periods = ["早讀", "升旗", "第一節", "第二節", "第三節", "第四節", "午休", "第五節", "第六節", "第七節", "第八節", "降旗"]

    # 初始化每個星期天的課表為一個有序的字典，包含所有時段
    schedule_data = {weekday: {period: [] for period in periods} for weekday in weekdays}

    # 在星期四的第三、第四節加入彈性學習，第五、第六節加入團體活動
    schedule_data["星期四"]["第三節"].append({"課程": "彈性學習", "老師": ""})
    schedule_data["星期四"]["第四節"].append({"課程": "彈性學習", "老師": ""})
    schedule_data["星期四"]["第五節"].append({"課程": "團體活動", "老師": ""})
    schedule_data["星期四"]["第六節"].append({"課程": "團體活動", "老師": ""})

    if table:
        for row in table.find_all('tr', class_='tblContent'):
            course_name = row.find(id=lambda x: x and x.endswith('_course_sname_lab')).text.strip()
            teacher_name = row.find(id=lambda x: x and x.endswith('_teach_name_lab')).text.strip()
            teach_time = row.find(id=lambda x: x and x.endswith('_teach_time_lab')).text.strip()
            
            time_slots = parse_time_string(teach_time)
            
            for day, period in time_slots:
                if 0 < day <= len(weekdays) and period in range(1, 9):
                    weekday = weekdays[day - 1]
                    period_name = periods[period + (2 if period >= 5 else 1)]
                    # 除了星期四的特殊時段，其他時段正常添加
                    if not (weekday == "星期四" and period_name in ["第三節", "第四節", "第五節", "第六節"]):
                        schedule_data[weekday][period_name].append({"課程": course_name, "老師": teacher_name})

    # 將字典轉換為有序列表
    ordered_schedule = []
    for weekday in weekdays:
        day_schedule = []
        for period in periods:
            if schedule_data[weekday][period]:
                day_schedule.append({period: schedule_data[weekday][period]})
            else:
                day_schedule.append({period: [] if period == "午休" else [{"課程": "", "老師": ""}]})
        ordered_schedule.append({weekday: day_schedule})

    return ordered_schedule

# 星期映射
weekday_mapping = {
    "一": "星期一",
    "二": "星期二",
    "三": "星期三",
    "四": "星期四",
    "五": "星期五",
    "六": "星期六",
    "日": "星期日"
}

# 時段映射
period_map = {
    0: "早讀", 
    1: "升旗", 
    2: "第一節", 
    3: "第二節", 
    4: "第三節", 
    5: "第四節", 
    6: "午休", 
    7: "第五節", 
    8: "第六節", 
    9: "第七節", 
    10: "第八節", 
    11: "降旗"
}

def calculate_absences(absence_data, schedule):
    course_schedule_map = {}
    course_period_count = {}  # 存儲每門課程每週的節數

    # 遍歷課程表，統計每門課程每週的節數
    for day_data in schedule:
        for weekday, periods in day_data.items():
            for period_data in periods:
                for period, classes in period_data.items():
                    for class_info in classes:
                        course_name = class_info['課程']
                        if course_name:
                            course_period_count[course_name] = course_period_count.get(course_name, 0) + 1
                            course_schedule_map[(weekday, period)] = course_name

    course_absences = {}

    # 使用原有邏輯計算每門課程的缺勤次數
    for date, absences in absence_data.items():
        weekday_chinese = date.split('(')[1][:1]
        weekday = weekday_mapping.get(weekday_chinese, "")

        for period_index, absence in enumerate(absences):
            period_name = period_map.get(period_index)
            course_name = course_schedule_map.get((weekday, period_name), "無課程")

            if course_name == "無課程" or period_name == "午休":
                continue

            if absence:
                course_absences.setdefault(course_name, {}).setdefault(absence, 0)
                course_absences[course_name][absence] += 1

    total_classes = {course: count * 18 for course, count in course_period_count.items()}  # 計算每門課程的總節數
    return course_absences, total_classes

def calculate_course_status(course_absences, total_classes):
    course_status = {}
    for course, absences in course_absences.items():
        total_absences = sum(absences.values())  # 計算總缺勤次數
        total = total_classes.get(course, 0)  # 獲取總節數
        third_of_classes = total // 3
        remaining_to_third = max(0, third_of_classes - total_absences)  # 計算距離三分之一還剩多少節課
        
        # 修改部分，只考慮曠課和事假的情況
        total_absences_for_threshold = absences.get("曠", 0) + absences.get("事", 0)
        remaining_to_third = max(0, third_of_classes - total_absences_for_threshold)

        course_status[course] = {
            "total_classes": total,
            "total_absences": total_absences_for_threshold,
            "over_threshold": total_absences_for_threshold >= third_of_classes,
            "remaining_to_threshold": remaining_to_third
        }
    return course_status


@app.route('/login', methods=['POST'])
async def login_and_fetch_data():
    # 從POST數據中獲取用戶名和密碼
    data = await request.get_json()
    user_id = data['UserId']
    password = data['Pswd']

    login_data = {
        'UserId': user_id,
        'Pswd': password,
        'BtnLogin': '登入',
    }
    
    # 定義URL變量
    login_url = 'https://sch.cyvs.tyc.edu.tw/SCH_UI/Login.aspx'
    schedule_url = 'https://sch.cyvs.tyc.edu.tw/SCH_UI/C/CBS01.aspx'
    absence_url = 'https://sch.cyvs.tyc.edu.tw/SCH_UI/D/DDS01.aspx'

    async with aiohttp.ClientSession() as session:
        html = await fetch(session, login_url)
        soup = BeautifulSoup(html, 'html.parser')
        viewstate = soup.find('input', id='__VIEWSTATE')['value']
        eventvalidation = soup.find('input', id='__EVENTVALIDATION')['value']
        login_data['__VIEWSTATE'] = viewstate
        login_data['__EVENTVALIDATION'] = eventvalidation

        login_response, is_login_successful = await login(session, login_url, login_data)

        if not is_login_successful:
            # 如果登入不成功，返回錯誤信息
            return jsonify({'error': 'Login failed'}), 401
        
        # 登入成功，獲取課表和缺勤信息
        html_schedule = await fetch(session, schedule_url)
        schedule_data = await parse_schedule_data(html_schedule)

        html_absence = await fetch(session, absence_url)
        absence_data = await parse_absence_data(html_absence)

        course_absences, total_classes = calculate_absences(absence_data, schedule_data)
        course_status = calculate_course_status(course_absences, total_classes)

        return jsonify({
            'schedule': schedule_data,
            'absence': absence_data,
            'course_absences': course_absences,
            'course_status': course_status
        })

if __name__ == '__main__':
    app.run()
    