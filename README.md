# 啟英高中學校缺曠課快速查詢工具

## 功能介紹
本工具由啟英高中的一名學生開發，旨在幫助學生們迅速了解自己的缺曠課狀況。使用者僅需輸入學號和校務系統密碼，即可查詢到自己各課程的缺曠記錄。

## 注意事項
- **節制使用**：為避免對校務系統造成過大負擔，請合理安排查詢次數。
- **非官方工具**：此工具非學校官方出品，僅作為學習和便利工具。
- **資料準確性**：所提供資料依據校務系統，如有異常請參考官方資料。
- **責任免除**：作為開發者，不承擔因使用此工具所產生的任何問題責任。
- **隱私保護**：不會儲存任何用戶個人資料。

## 系統需求
- Python 3.10
- Node.js v18.16.1

## 安裝指南

### 安裝Python依賴
所需的Python庫包括Quart、quart-cors、aiohttp和BeautifulSoup。安裝指令如下：

```bash
pip install quart quart-cors aiohttp beautifulsoup4
```

### 安裝前端依賴
前端採用Vue 3和Vuetify，透過以下指令安裝依賴：

```bash
npm install
```

### Hypercorn伺服器設定
建議使用Hypercorn作為後端伺服器。安裝Hypercorn的指令：

```bash
pip install hypercorn
```

啟動伺服器：

```bash
hypercorn your_application:app --reload
```

### 啟動前端開發服務器
使用以下指令啟動前端開發服務器：

```bash
npm run dev
```

## 前端設定
在 `src/pages/Home.vue` 檔案中，將 `/api` 路徑替換為您的後端伺服器地址。示例代碼：

```javascript
const onSubmit = async () => {
    loading.value = true;

    try {
        const response = await axios.post('/api', {
            UserId: email.value,
            Pswd: password.value
        });
        // 續...
    } catch (error) {
        // 錯誤處理...
    } finally {
        loading.value = false;
    }
};
```

## 使用方式
- 啟動後端伺服器：運行Hypercorn指令。
- 啟動前端開發服務器：執行 `npm run dev`。
- 通過瀏覽器訪問前端應用，並使用學號和密碼登入。

## 開源聲明

本工具是在 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 的條款下提供的。此外，還附加了以下自定義條款：

- **非商業用途**：本工具僅供非商業用途。任何商業使用均不允許。
- **禁止非法用途**：嚴禁將本工具用於任何非法目的。
- **標明出處**：在使用或改作本工具時，必須明確標明原始作者和出處。

使用本工具即表示您同意遵守上述條款以及 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 的所有相關條款。

更多信息請訪問 [Creative Commons 官網](https://creativecommons.org/licenses/by-nc-sa/4.0/)。

## 功能說明
- **登入**：使用學號和校務系統密碼。
- **查詢缺曠**：登入後可查看缺曠狀況。
- **隱私保障**：不會儲存個人資料。
