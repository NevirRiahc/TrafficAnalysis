package com.university.demo.util.Sms;



import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;

import java.io.IOException;
import java.util.HashMap;

/**
 * 短信验证码SDK
 */
public class SendSms {
    public static HashMap<String,String> getMessageStatus(String mobile, String verCode) throws IOException {
        HashMap<String,String> hashMap = new HashMap<>();
        // 第三方平台网站地址阿里
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou"
        		, "LTAI4FbgffEVhVHiUrw71eu2"
        		, "RyWJQT7a7iH002tkSSwv58QPEfxzCH");
        IAcsClient client = new DefaultAcsClient(profile);
        CommonRequest request = new CommonRequest();
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("PhoneNumbers", mobile);
        request.putQueryParameter("SignName", "小毕旅游网");
        request.putQueryParameter("TemplateCode", "SMS_183796696");
        request.putQueryParameter("TemplateParam", "{code:"+verCode+"}");
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
            //6位数验证码放入到map列表里面和赋值result=1状态码
            hashMap.put("result", "1");
            hashMap.put("code", verCode);
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
        return hashMap;
    }

}