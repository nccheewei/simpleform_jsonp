/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log("app init");
        app.setPage("loginpage");
        console.log("add event to submit button");
        $("#submit").click(function(e){
            e.preventDefault();

            
            var a = $('*[data-nc_page="loginpage"]');
            console.log("calling ajax");
            $.ajax({
                type:"POST",
                url:_config.url,
                data:{
                    method:"login",
                    email:a.find('input[name="email"]').val(),
                    password:a.find('input[name="password"]').val()
                },
                dataType:"jsonp",
                timeout:25000,
                success:function(d){
                    console.log("ajax success");
                    if(d.error){
                        alert(d.msg);
                    }else{
                        app.setResultPage(d.msg);
                        app.setPage("resultpage");
                    }
                },
                error:function(request,status,err){
                    console.log("ajax error");
                    alert(status);
                }
            });
        });
    },
    setPage:function(pindex){
        $('*[data-nc_page]').addClass("hide");
        switch(pindex){
            case "loginpage":
                app.resetLogin();
                $('*[data-nc_page="'+pindex+'"]').removeClass("hide");
            break;
            case "resultpage":
                $('*[data-nc_page="'+pindex+'"]').removeClass("hide");
                setTimeout(function(e){
                    app.setPage("loginpage");
                },5000);
            break;
        }
    },
    //login page
    resetLogin:function(){
        var a = $('*[data-nc_page="loginpage"]');
        a.find('input[name="email"]').val('');
        a.find('input[name="password"]').val('');
    },
    //setup result page
    setResultPage:function(msg){
        $('*[data-nc_page="resultpage"] .result').text(msg);
    }
};
