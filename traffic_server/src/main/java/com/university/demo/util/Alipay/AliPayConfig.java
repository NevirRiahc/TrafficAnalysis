package com.university.demo.util.Alipay;

import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 支付宝支付设置
 * @author jitwxs
 * @since 2018/6/4 19:04
 */
@Configuration
public class AliPayConfig {
    private String NAT_APP_URL = "http://wcx45k.natappfree.cc";

    private String gatewayUrl = "https://openapi.alipaydev.com/gateway.do";
    private String appId = "2016092500594263";
    private String merchantPrivateKey = "MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCkcFsACfhCZCt/418GwtRCMMKNh5QSYMjbppPgy52RhvPd7wu0nV8McFD1Uo7i6i9/kYfhpPl80ms29oncqMb+eH+4+QiE/h1k4c2cunV3/4iMUkI7+ui3e72hkHl3ycMlqhaIocYKTDJXleXrctV87QMhSdD0mk7qw9rCIUO/i7Q6gP9cnalvcXb1yiuw3pblQH306Gbh+6MqZoLfvfM6wPeVFMuo18eUZ8VrVAn01chkflByYv1fAFOMPEHO+UakbMYAgAGjJUG/XTL9hB8gYvut+EefcyDPFNwavoDBZwLiKW3zQcWX5T700/doZJL9+dMF8dVNshXqYYIiE7ArAgMBAAECggEABG0Rxfp+uCrCEPspv6DW3cE6O1z+20/HmEHvkQlqAFTFk5+vjPj/afJL+45xUiJDjQd5xNUP8hAn2p7gLxRL5uWPaocpd4rvd5usUR+jscsq/bvpFHw4b1fhTsv4uQSxP/5IBP11uyk54amjOqcon+gxQWAfQ7YzkZYb+UWz8R/iSmZe79Fe9cq8+0dQnahYQXbDFz2mECMxDEJmGmd0VdQyPduGRBustaLnTzBIpC6Ze3tQiptD2A0E8mX50ZjddbFNbYTjFWOLp3pG1U9CS0hjxlZGBSB2wl3Qk8ZN75gxRU8lyX/qGf4TsyQRsDu00xTGHYnF9/hUIJEM5xW+QQKBgQD2pVCD0rUbWC72qvCtI0wURdcx+deOYHh4yrkTFTeU6N9Vi1aS/srfK/CJ/7yVoGVoG5qGX1p72vAoigfnovsLkZiLj2Mevgob1JZME+7yGsaXjpyfQT4SWfGNovKuDcZWFVy606t7bGFTimgkJfxgup/Z7r8Ruq0lJuVtybAWyQKBgQCqrOTS4Fur0Vp6xnPsIEySnTtbXRATdSPKq82aDQ5jW6w3gjsCuy8J4wHVh4O9/FA1Bpjm0guiH4L2RImncK7W20fgDheTCUvCNorGduu6S3Y3B0Kk+NcIPeg/uY4KvAa3nI63rGa/J20I2CtE/klGwasRt26gfcm3Kg/kuYdlUwKBgEwTFVBzjzTN8D5Y3z8n4fFm0Ucy3o+lpcLsFEWUh75ATZJfFebk+8H2FY0a+hnUjTKdQP4tLwWAtA5s9J83n+Mjlz+EjHgQ+aE34tu4Uj0OkS5x6FEemHykjWK4Xc3dpc0rbZyaaQv6k9JmoFR1+vAC4AciIoDfaURKSP2h9dQxAoGAFF2FAFSdG6djcHr1ohtIh8YTKxezr16u4qQVaGheaySpLAZyHCVRu5BGy7/bzHOq7mjXHdO6Z6Hy8ofDFSOw+Ro5PVbxIS5ex9HSRVQzVItkk7ReE2lN30Hj0JbHiChfdNFNhkUgDXca349LunPNMpAxZW/J14Sq6RwvwU8SBNkCgYB5WLSX1VA8rO/Q4tudFofRd642PHsW4g6Qd1H+WlSWx9njPJJRZgDAIzEsCqwAHS7YLYJ+byG1SRpAguuYwxPDExzB+/ARHHApFT4K+Pica1FcRKDde3i7ubhz+b0HKogXkSe2b+4C2eWgToHjvUJOM09Nvc5tApKTpwyEPGZKLg==";
    private String alipayPublicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy4HYxErHOPLSPvgtO5/jC7DF9eHNUkZqhOmkQqpucvH9MyMiwkPXNYtJiV6XQ2GFWvogqWVch2QIPXV3uXMRG2WNWol7By+nR9ugeYPhvNHYNqK2Tq3liyluizUwV+5/SiuTRpz6MBR/GUtIpejCAK6/ZMw+caAV2KlOkoo51Zb/HRJDfZvFX6M/v2Rfjd/ut4jlW/zuuCMgymVKKJRudzRS4PoGT5hyJyM2bkD63dBjby/pduv4WgIzLhUIGSc8lvXVsf6k1jr9WJdiqEIMRlGgFzXebrDhRjygbbJbwzRgN2jQJKEZI1ZobJed+Yn6Kuh/9qaTcq4WTeuQTKzFGwIDAQAB";
    private String signType = "RSA2";
    private String sellerId = "2088102177227915";
    private String notifyUrl = NAT_APP_URL + "/order/alipay/notify";
    private String returnUrl = NAT_APP_URL + "/order/alipay/return";

    public String getGatewayUrl() {
        return gatewayUrl;
    }

    public void setGatewayUrl(String gatewayUrl) {
        this.gatewayUrl = gatewayUrl;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getMerchantPrivateKey() {
        return merchantPrivateKey;
    }

    public void setMerchantPrivateKey(String merchantPrivateKey) {
        this.merchantPrivateKey = merchantPrivateKey;
    }

    public String getAlipayPublicKey() {
        return alipayPublicKey;
    }

    public void setAlipayPublicKey(String alipayPublicKey) {
        this.alipayPublicKey = alipayPublicKey;
    }

    public String getSignType() {
        return signType;
    }

    public void setSignType(String signType) {
        this.signType = signType;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getNotifyUrl() {
        return notifyUrl;
    }

    public void setNotifyUrl(String notifyUrl) {
        this.notifyUrl = notifyUrl;
    }

    public String getReturnUrl() {
        return returnUrl;
    }

    public void setReturnUrl(String returnUrl) {
        this.returnUrl = returnUrl;
    }

    @Bean
    AlipayClient alipayClient() {
        return new DefaultAlipayClient
                (gatewayUrl, appId, merchantPrivateKey, "json", "utf-8", alipayPublicKey, signType);
    }
}
