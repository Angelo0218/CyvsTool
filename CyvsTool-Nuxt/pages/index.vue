<template>
    <nav class="navbar">
        <img src="/apple-icon-144x144.png" alt="Logo" class="logo" />
        <h1 class="title">啟英高中缺礦查詢工具</h1>

    </nav>
    <v-sheet class="pa-8">
        <v-card class="mx-auto px-6 py-10" max-width="460">
            <h1 style="font-size: 1.6rem;    margin-bottom: 0.2em; ">登入
            </h1>
            <h2 style=" font-size: 1rem;    margin-bottom: 2em; font-weight: 500;">輸入學生校務系統帳號和密碼以查詢出席記錄。</h2>

            <v-form @submit.prevent="onSubmit">
                <v-text-field v-model="email" :readonly="loading" class="mb-2" clearable label="學號" placeholder="輸入學號"
                    required></v-text-field>
                <v-text-field v-model="password" :readonly="loading" clearable label="校務系統密碼" placeholder="輸入密碼"
                    type="password" required></v-text-field>

                <v-btn :disabled="!email || !password || loading" :loading="loading" block color="#667054" size="large"
                   aria-label="查詢" @click="checkTerms">
                    查詢
                </v-btn>

            </v-form>

            <v-alert v-if="loginError" type="error" class="mt-4" role="alert">
                {{ loginError }}
            </v-alert>


            <h3 style="font-size: 0.8rem; font-weight: 500;text-align: center; margin-top: 10px;">
                ※此工具並不會儲存用戶資料，如有疑慮可<a href="mailto:angelo0218@ajlo.org">聯繫作者</a>
            </h3>
        </v-card>
    </v-sheet>
    <v-sheet class="pa-5">
        <v-card class="mx-auto px-6 py-8" max-width="460">
            <h1 style="font-size: 1.6rem; margin-bottom: 0.2em;">使用教學</h1>

            <h2 style="margin-top: 20px; font-size: 1rem; font-weight: 500;">1. 輸入校務系統帳號密碼</h2>
            <video src="/test1.mp4" style="width: 100%; height: auto;" autoplay muted loop playsinline loading="lazy"
                preload="auto"></video>

            <h2 style="margin-top: 20px; font-size: 1rem; font-weight: 500;">2. 點選查詢</h2>
            <video src="/test2.mp4" style="width: 100%; height: auto;" autoplay muted loop playsinline loading="lazy"
                preload="auto"></video>

            <h2 style="margin-top: 20px; font-size: 1rem; font-weight: 500;">3. 即可查看各個科目的缺曠狀況</h2>
            <video src="/test3.mp4" style="width: 100%; height: auto;" autoplay muted loop playsinline loading="lazy"
                preload="auto"></video>
        </v-card>

    </v-sheet>

    <AbsenceDialog :course-absences="courseAbsences" :course-status="courseStatus" v-model="showDialog" />
    <footer class="my-footer">
        <p class="footer-text footer-bold">Copyright© 苗栗國政府|教育廳</p>
        <p class="footer-text footer-md">苗栗國（Myori）為網路虛擬國家</p>
        <button class="blue-underline" @click="openTermsOnly" aria-label="打開使用條款">
            使用條款
        </button>

    </footer>
    <v-dialog ref="termsDialog" v-model="showTermsDialog" persistent max-width="600px">
        <v-card>
            <v-app-bar app dense flat>
                <v-toolbar-title>使用者條款</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="showTermsDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>
				    <v-card-text class="terms-text" style="font-size: 16px; margin-top: 50px">
    <p>歡迎使用本查課缺曠系統(以下簡稱"本系統")。為了確保您能安全有效地使用本系統，請務必閱讀並同意遵守以下條款。一旦您開始使用本系統，即視為您已接受本條款的約束。</p>
    <p><strong>網頁版本:</strong> 本使用者條款適用於本系統目前的1.5.3版網頁版本。</p>
    <p><strong>服務內容:</strong>
        本系統為學生提供查詢課程缺曠記錄的工具，僅作為參考，不具有任何官方效力。查詢結果可能由於調課、批改等原因而與實際情況有所出入，請以學校官方渠道公布的資料為準。</p>
    <p><strong>資料來源:</strong>
        本系統所使用的資料來自亞昕資訊股份有限公司為桃園市啟英高中(tyc.edu.tw)開發的校務系統。我們透過網路爬蟲技術從該系統獲取資料，未曾存取任何機密或非公開資料。</p>
    <p><strong>隱私與安全:</strong>
        為避免觸碰個人資料及違反相關法令，本系統未內置任何個人身份資訊，使用者需自行輸入班級及年級等公開資訊。我們絕不會存取或記錄您的任何個人信息，所有查詢操作均在您的本機設備上進行。</p>
    <p><strong>使用限制:</strong> 為確保系統暢順運行，本系統對查詢次數做出了合理限制。</p>
    <p><strong>系統維護:</strong> 本系統由1人獨立維護，更新速度可能較慢，如有不便之處還請見諒。</p>
    <p><strong>高峰時段:</strong> 有時上課高峰期間，校務系統可能會無法使用，請見諒。</p>
    <p><strong>課表變更:</strong> 校務課表有時可能會被校方刪除，開發者正在調查此問題並尋找解決方案。</p>
    <p><strong>風險提示:</strong>
        若學校或亞昕資訊股份有限公司認為本系統可能會影響其系統安全穩定運作，或對本系統有其他安全疑慮，學校或亞昕資訊股份有限公司有權採取適當的管控措施，例如限制或禁止使用本系統等。請您理解並配合學校的決定。您使用本系統的一切行為風險應由您自行承擔。</p>
    <p><strong>知識產權:</strong> 關於本系統的知識產權詳情，請參考GitHub上的條款：<a href="https://github.com/Angelo0218/CyvsTool" target="_blank">https://github.com/Angelo0218/CyvsTool</a>。</p>
    <p><strong>版權所有:</strong> 本系統的版權歸Angelo0218個人及其團隊所有。</p>
    <p><strong>條款變更:</strong> 開發者有權隨時修訂本條款，修訂後的條款一經公佈即生效。</p>
    <p><strong>免責聲明:</strong> 開發者不對使用本系統直接或間接造成的任何損失承擔責任。</p>
    <p><strong>法律適用:</strong> 本條款受中華民國相關法律管轄。</p>
    <p><strong>服務中止權利:</strong> 開發者保留在特定情況下中止或終止部分或全部服務的權利。</p>
    <p><strong>原始碼:</strong> 如想查看本系統的原始碼，請訪問GitHub專案。</p>
    <p><strong>年齡限制:</strong> 本系統僅限年滿18歲的成年人使用。未成年人使用需在家長或監護人的同意和陪同下進行。</p>
</v-card-text>

            <v-checkbox v-if="isTermsDialogInteractive" v-model="neverShowAgain" label="不再顯示此視窗" style="margin:auto; ">
            </v-checkbox>
            <v-card-actions v-if="isTermsDialogInteractive" style="margin-top:-20px">
                <v-btn color="white" class="custom-large-btn" @click="acceptTerms"
                    style="font-size: large; background: #667054; flex: 1; margin-right: 5px;">
                    我已閲讀並同意以上
                </v-btn>
                <a @click="openMultipleWindows" target="_self">
                    <v-btn color="white" class="custom-large-btn"
                        style="font-size: large; background: #667054; flex: 1; margin-left: 5px;">
                        不同意
                    </v-btn>
                </a>
            </v-card-actions>

        </v-card>
    </v-dialog>




</template>

<script>
import { ref, watch, defineAsyncComponent } from 'vue';

const AbsenceDialog = defineAsyncComponent(() => import('@/components/AbsenceDialog.vue'));

export default {
    setup() {
        const email = ref(null);
        const password = ref(null);
        const showTermsDialog = ref(false);
        const neverShowAgain = ref(false);
        const loading = ref(false);
        const showDialog = ref(false);
        const courseAbsences = ref({});
        const loginError = ref(false);
        const courseStatus = ref({});
        const termsDialog = ref(null);
        const isTermsDialogFromQuery = ref(false);
        const isTermsDialogInteractive = ref(false);

        watch(showTermsDialog, (newVal) => {
            if (newVal) {
                // 當對話框打開時
                termsDialog.value.scrollTop = 0; // 將滾動條設置到頂部
            }
        });
        watch(isTermsDialogFromQuery, (newValue) => {
            console.log('isTermsDialogFromQuery changed to: ', newValue);
        });

        const onSubmit = async () => {
            loading.value = true;
            loginError.value = false; // 重置登入錯誤信息

            try {
                const response = await fetch('https://api.ajlo.org/cyvs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        UserId: email.value,
                        Pswd: password.value
                    })
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('登入失敗：使用者名稱或密碼錯誤');
                    } else {
                        throw new Error('學校校務系統目前發生錯誤或課表介面無法抓取，請稍後再嘗試。如果問題持續，請通知開發者。');
                    }
                }

                const data = await response.json();

                courseAbsences.value = data.course_absences;
                courseStatus.value = data.course_status;
                showDialog.value = true;
            } catch (error) {
                console.error(error);
                loginError.value = error.message; // 設定錯誤信息
            } finally {
                loading.value = false;
            }
        };

        const openMultipleWindows = () => {
            alert('苗栗國萬歲！')
            window.open('https://play.google.com/store/apps/details?id=com.myori.pass&hl=en_US');
        }

        const checkTerms = () => {
            if (localStorage.getItem('neverShowTerms') === 'true' || neverShowAgain.value) {
                onSubmit();  // 已同意條款，直接提交
            } else {
                isTermsDialogInteractive.value = true;  // 需要顯示條款對話框
                showTermsDialog.value = true;
            }
        };


        const openTermsOnly = () => {
            isTermsDialogInteractive.value = false;  // 設置為非互動式對話框
            showTermsDialog.value = true;
        };

        const acceptTerms = () => {
            localStorage.setItem('neverShowTerms', neverShowAgain.value ? 'true' : 'false');
            showTermsDialog.value = false;
            onSubmit();  // 同意條款後提交表單
        };



        return {
            email,
            password,
            showTermsDialog,
            neverShowAgain,
            checkTerms,
            acceptTerms,
            onSubmit,
            loading,
            showDialog,
            courseAbsences,
            loginError,
            courseStatus,
            termsDialog,
            openTermsOnly,
            openMultipleWindows,
            isTermsDialogInteractive,
            isTermsDialogInteractive
        };
    }
}
</script>


<style>
h1,
h3 {
    display: block;
    text-align: start;
    font-weight: bolder;
    color: #667054;


}

.terms-text ul {
    padding-left: 1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}

.terms-text ul li {
    margin-bottom: 0.5em;
}

.terms-text p {
    margin-bottom: 0.5em;
}

.terms-text .text-center {
    margin-top: 1em;
    font-weight: 400;
}

a {
    color: #1976D2;
    /* 藍色連結 */
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.blue-underline {
    text-decoration: underline;
    text-decoration-color: blue;
    text-decoration-thickness: 1px;
    /* 控制底線粗細 */
    border: none;
    /* 移除標準按鈕邊框 */
    background: none;
    /* 移除背景顏色 */
    color: blue;
    /* 文字顏色 */
    cursor: pointer;
    /* 滑鼠懸停時顯示指標 */
    padding: 5px;
    /* 內部間距 */
    font-size: 16px;


}

.navbar {
    display: flex;
    padding: 1.3rem;

    color: #667054;
    z-index: 1;


    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;

}


/* 左侧部分样式 */
.logo-section {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    /* 调整为适当的值 */

}

/* Logo样式 */
.logo {
    height: 2rem;
    /* 调整为适当的值 */
    width: 2rem;
    /* 调整为适当的值 */

}

/* 标题样式 */
.title {
    font-size: 1.2rem;
    /* 调整为适当的值 */
    font-weight: bold;

    margin-left: 10px;
}

.my-footer {
    text-align: center;
    padding: 1.5rem;

}

.footer-text {
    font-size: 1rem;
}

.footer-bold {
    font-weight: bold;
}

.footer-md {
    font-size: 0.875rem;
    /* 14px assuming a base font size of 16px */
}

.footer-link {
    color: inherit;
    text-decoration: none;
}

.footer-link:hover {
    color: #888888;
}

.custom-justify-center {
    display: flex;
    justify-content: center;
    width: 100%;
    /* 確保滿寬 */
}
</style>
