# 啟英高中第三方缺曠查詢工具

## 功能介紹

本工具由啟英高中的一名學生開發，旨在幫助學生們迅速了解自己的缺曠課狀況。使用者僅需輸入學號和校務系統密碼，即可查詢到自己各課程的缺曠記錄。

## 新功能與更新 - 版本 1.5.2

- **技術棧更新**：從 Vite 4 改用 Nuxt 3。
- **HTTP 請求處理**：移除 axios，改用原生 fetch 方法。
- **後端功能增強**：新增計算學生缺礦課次數佔課程總數 1/3 的功能。
- 現在，這個功能已經升級，採用事假和曠課的總和作為計算的依據，更全面地反映學生的缺勤情況。
- **PWA 支持**：已增加 PWA 支持，但目前尚不支持離線使用。
- **SEO優化**：文字改成語意化HTML。
- **修改1/3計算達成方式**：原始計算方式考慮所有類型的缺勤，現已更改為僅考慮事假和曠課的情況。
   - 計算方式修改為事假+曠課，以更準確地反映學生的缺課情況。
   - 這一變更使得在判斷學生是否超過缺課三分之一的標準時，只計算事假和曠課的次數。
- **UI 修改與使用教學**：
  - 新增更直觀的使用者界面，提高使用體驗。
## 未來更新項目

- **課表整合**：計劃將課表功能整合至網站中，方便快速查詢。
- **成績查詢**：未來將增加成績快速查詢功能。

## 演示網站

[啟英高中缺曠課查詢工具](https://cyvstools.ajlo.org/)

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

### 安裝 Python 依賴

所需的 Python 庫包括 Quart、quart-cors、aiohttp 和 BeautifulSoup。安裝指令如下：

```bash
pip install quart quart-cors aiohttp beautifulsoup4
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

在 `pages/Home.vue` 檔案中，將 `/api` 路徑替換為您的後端伺服器地址。示例代碼：

```javascript
   const onSubmit = async () => {
            loading.value = true;
            loginError.value = false; // 重置登入錯誤信息

            try {
                const response = await fetch('https://api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        UserId: email.value,
                        Pswd: password.value
                    })
                });
```

## 使用方式

- 啟動後端伺服器：運行 Hypercorn 指令。
- 啟動前端開發服務器：執行 `npm run dev`。
- 通過瀏覽器訪問前端應用，並使用學號和密碼登入。

## 功能說明

- **登入**：使用學號和校務系統密碼。
- **查詢缺曠**：登入後可查看缺曠狀況。
- **隱私保障**：不會儲存個人資料。


## 開源聲明

本工具是在 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 的條款下提供的。此外，還附加了以下自定義條款：

- **非商業用途**：本工具僅供非商業用途。任何商業使用均不允許。
- **禁止非法用途**：嚴禁將本工具用於任何非法目的。
- **標明出處**：在使用或改作本工具時，必須明確標明原始作者和出處。

使用本工具即表示您同意遵守上述條款以及 Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 的所有相關條款。

更多信息請訪問 [Creative Commons 官網](https://creativecommons.org/licenses/by-nc-sa/4.0/)。
