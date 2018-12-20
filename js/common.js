function setUserInfo() {
    var username = localStorage.username;
    if (username) {
        $('.login-register').html('<div class="icon" style="margin-right: 10px;"></div>' + username);
    } else {
        $('.login-register').html('<div class="icon"></div><a href="javascript:;" id="login">登录</a><div class="separate"></div><a href="javascript:;" id="register">注册</a>');
    }
}
setUserInfo();

$('.login-register a').on('click', function () {
    $('#model').show();
});

$('#model .container .close-model').on('click', function () {
    $('#model').hide();
    $('#model input').val('');
    $('#model button').addClass('disable');
});

$('#model .container .model-tabs>div').on('click', function () {
    $(this).addClass('active').siblings('div').removeClass('active');
    var index = $(this).index();
    $('#model .model-view').eq(index).addClass('active').siblings('.model-view').removeClass('active');
    var height = [480, 740];
    $('#model .container').height(height[index]);
    $('#model input').val('');
    $('#model button').addClass('disable');
});

$('#model .container .login-view input').on('input', function () {
    setErrInput(false);
    var user = $('#model .login-view .user input').val();
    var pass = $('#model .login-view .pass input').val();
    if (user && pass) {
        $('#model .login-view>button').removeClass('disable');
        return true;
    } else {
        $('#model .login-view>button').addClass('disable');
        return false;
    }
});

// $('#model .close-icon').on('click', function () {
//     $(this).siblings('input').val('');
//     $(this).hide();
// });

function setErrInput(bool, msg) {
    msg = msg || '';
    if (bool) {
        $('#model .login-view .form-control').css('border', '1px solid #F66A65');
        $('#model .login-view .err-msg').text(msg);
    } else {
        $('#model .login-view .form-control').css('border', '1px solid #ced4da');
        $('#model .login-view .err-msg').text(msg);
    }
}

// 登录
$('#model .login').on('click', function () {
    var user = $('#model .login-view .user input').val();
    var pass = $('#model .login-view .pass input').val();
    if (!user || !pass) {
        return false;
    }
    if (user === 'admin' && pass === '123456') {
        console.log('登录成功');
        localStorage.username = user;
        $('#model').hide();
        $('#success-msg').show().find('span').text('登录成功！');
        setTimeout(function () {
            $('#success-msg').hide();
            setUserInfo();
        }, 2000);
    } else {
        console.log('账号密码错误');
        setErrInput(true, '账号密码错误')
    }
});

$('#model .register-view .captchae span').on('click', function () {
    if ($(this).text() !== '获取验证码') {
        return;
    }
    localStorage.time = 60;
    $(this).text('已发送(' + localStorage.time + 's)').css('color', '#EDB11B');
    var self = this;
    var timer = setInterval(function () {
        var time = +localStorage.time;
        console.log(time)
        time--;
        localStorage.time = time;
        $(self).text('已发送(' + time + 's)').css('color', '#EDB11B');
        if (time <= 0) {
            clearInterval(timer);
            $(self).text('获取验证码').css('color', '#388BE0');
        }
    }, 1000);
});

$('#model .register-view .agreement').on('click', function () {
    if ($(this).find('img').attr('src') === './img/register_unselected.png') {
        $(this).find('img').attr('src', './img/register_selected.png');
        $('#model .register-view button').removeClass('disable');
    } else {
        $(this).find('img').attr('src', './img/register_unselected.png');
        $('#model .register-view button').addClass('disable');
    }
});

// 注册
$('#model .register').on('click', function () {
    if ($(this).hasClass('disable')) {
        return;
    }
    var registerForm = {
        user: $('#model .register-view .user input').val(), // 账号
        captchae: $('#model .register-view .captchae input').val(), // 验证码
        pass: $('#model .register-view .pass input').val(), // 设置密码
        confirmPass: $('#model .register-view .confirm-pass input').val(), // 确认密码
        inviteCode: $('#model .register-view .invite-code input').val(), // 邀请码
    }
    console.log(registerForm);
    $('#model').hide();
    $('#success-msg').show().find('span').text('注册成功！');
    setTimeout(function () {
        $('#success-msg').hide();
    }, 2000);
});

// 忘记密码
$('#forgot-pass .captchae span').on('click', function () {
    if ($(this).text() !== '获取验证码') {
        return;
    }
    localStorage.forgotTime = 60;
    $(this).text('已发送(' + localStorage.forgotTime + 's)').css('color', '#EDB11B');
    var self = this;
    var timer = setInterval(function () {
        var time = +localStorage.forgotTime;
        console.log(time)
        time--;
        localStorage.forgotTime = time;
        $(self).text('已发送(' + time + 's)').css('color', '#EDB11B');
        if (time <= 0) {
            clearInterval(timer);
            $(self).text('获取验证码').css('color', '#388BE0');
        }
    }, 1000);
});
$('#forgot-pass .container input').on('input', function () {
    setErrInput(false);
    var user = $('#forgot-pass .user input').val();
    var captchae = $('#forgot-pass .captchae input').val();
    var pass = $('#forgot-pass .pass input').val();
    var confirmPass = $('#forgot-pass .confirm-pass input').val()
    console.log(user, captchae, pass, confirmPass)
    if (user && pass && captchae && confirmPass) {
        $('#forgot-pass button').removeClass('disable');
        return true;
    } else {
        $('#forgot-pass button').addClass('disable');
        return false;
    }
});
$('#forgot-pass button').on('click', function () {
    var user = $('#forgot-pass .user input').val();
    var captchae = $('#forgot-pass .captchae input').val();
    var pass = $('#forgot-pass .pass input').val();
    var confirmPass = $('#forgot-pass .confirm-pass input').val()
    if (!user || !pass || !captchae || !confirmPass) {
        return false;
    }
    $('#forgot-pass').hide();
    $('#success-msg').show().find('span').text('修改成功！');
    setTimeout(function () {
        $('#success-msg').hide();
        localStorage.clear();
        location.reload();
    }, 2000);
});
$('#model .forgot-pass').on('click', function () {
    $('#model').hide();
    $('#forgot-pass').show();
});
