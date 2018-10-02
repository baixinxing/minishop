<?php

namespace App\Http\Controllers\Api;

use App\User;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Overtrue\LaravelWeChat\Facade as EasyWeChat;
use Socialite;
use Validator;

class AuthenticateController extends ApiController
{

    use AuthenticatesUsers;

    public function __construct()
    {
        $this->middleware('auth:api')->only([
            'logout'
        ]);
    }

    public function username()
    {
        return 'openid';
    }

    /**
     * 处理小程序的自动登陆和注册
     * @param Request $request
     * @return mixed
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidConfigException
     */
    public function auto_login(Request $request)
    {
        // 获取openid
        $mini = EasyWeChat::miniProgram();
        $miniInfo = $mini->auth->session($request->get('code'));
        // 判断用户是否合法
        if (!$request->get('openid') && empty($miniInfo['openid'])) {
            return $this->failed('用户openid没有获取到', 401);
        }
        $openid = empty($miniInfo['openid']) ? $request->get('openid') : $miniInfo['openid'];
        $userInfo = User::where('openid', $openid)->first();
        if ($userInfo && $userInfo->toArray()) {
            //执行登录
            $userInfo->login_ip = $this->getClientIP();
            $userInfo->login_time = Carbon::now();
            $userInfo->save();
            // 直接创建token
            $token = $userInfo->createToken($openid)->accessToken;
            return $this->success(compact('token', 'userInfo'));
        } else {
            //执行注册
            return $this->register($request, $openid);
        }
    }

    /*
     * 用户注册
    * @param Request $request
    */
    public function register($request, $openid)
    {
        //  进行基本验证
        return $request->input('rawData');
        $user_info = \GuzzleHttp\json_decode($request->input('rawData'), true);
        //注册信息  字段名=》get到的值
        $newUser = [
            'openid' => $openid, //openid
            'nickname' => $user_info['nickName'],// 昵称
            'email' => time() . 'sqc157400661@163.com',// 邮箱
            'name' => $user_info['nickName'],// 昵称
            'avatar' => $user_info['avatarUrl'], //头像
            'unionid' => '', // unionid (可空)
            'state' => 1,
            'role' => 0,
            'password' => bcrypt('sqcweida'),
            'login_ip' => $this->getClientIP(),
            'login_time' => Carbon::now()
        ];
        //dd($newUser);
        $userInfo = User::create($newUser);
        // 直接创建token
        $token = $userInfo->createToken($openid)->accessToken;
        return $this->success(compact('token', 'userInfo'));
    }

    protected function sendFailedLoginResponse(Request $request)
    {
        $msg = $request['errors'];
        $code = $request['code'];
        return $this->setStatusCode($code)->failed($msg);
    }
}
