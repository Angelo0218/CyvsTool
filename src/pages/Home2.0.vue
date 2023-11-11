<template>
    <div style="display: flex;">
        <img src="https://www.upmedia.mg/upload/article/20180928111724891043.png" alt="素養啟英" style="height:100vh; width:60%;object-fit: cover;">
        <div style="width:100%; margin-left: 50px;">
            <img src="@/assets/cyvslogo.png" alt="" style=" width:340px;  padding-top: 30px; ">
            <br>
            <br>
            <h4>登入</h4>
            <br>
        
        
            <input type="text" placeholder="學號" name="uname" required style="margin-bottom: 20px; width:300px;" >
            <input type="password" placeholder="密碼" name="psw" required style="margin-bottom: 20px; width: 300px;">
            <br>
            <BR></BR>
            <button type="submit" style="background-color: #2672ec; color: white; width:65px; padding: 5px; margin-bottom: 20px;">登入</button>
            <div id="introduction" class="groupMargin">
            <p><a href="https://utacm.adm.u-tokyo.ac.jp/webmtn/LoginServlet" xt-marked="ok">密碼変更・再設定</a><br><a href="https://utacm.adm.u-tokyo.ac.jp/webmtn/LoginServlet" xt-marked="ok">Change or reset your password</a><br><br><a href="https://utelecon.adm.u-tokyo.ac.jp/utokyo_account/" xt-marked="ok">關於校務系統賬號</a><br><a href="https://utelecon.adm.u-tokyo.ac.jp/en/utokyo_account/" xt-marked="ok">About Chi-Ying Account</a></p>                     
        </div>
        </div>
    </div>
</template>
<style>
input {
  border: 1px solid #000;
  border-radius: 3PX;
  outline: none;
}
</style>