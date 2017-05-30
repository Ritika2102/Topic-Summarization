$(window).load(function() {
            console.log("onLoad Called");
            
                        $("#searchBox").bind("keypress", function(e) {
                                if (e.keyCode == 13) {
                                    $("#searchButton").click();
                                }
                                });
            
            $( "#searchButton").click(function() {
                    console.log(this);
                    var qToAsk=$("#searchBox")[0].value;


                      $.ajax({
                                            url: "http://54.159.236.70:8983/solr/project4/select/?q=text_en:"+encodeURI(qToAsk)+"&rows=0&facet=on&facet.field=Topic&wt=json", 
                                            success: function(result){
                                            console.log(result);
                                            $(".cardContainer").show();

                                            responseJson=JSON.parse(result);
                                            facet_fields_arr=responseJson.facet_counts.facet_fields.Topic;
                                            var positive=[];
                                            var pushValue = 0;
                                            for(var i=1;i<facet_fields_arr.length;i=i+2){
                                                if(facet_fields_arr[i]>0){
                                                    pushValue = facet_fields_arr[i-1];
                                                    positive.push(parseInt(pushValue));
                                                }
                                            }
                                            positive.sort(function(a, b){return a-b});
                                            console.log(positive);
                             
                                            var cardsContent="";
                             
                                            if(positive.length == 0){
                                                var temp="<div><h1>No results found </h1></div>";
                                                cardsContent+=temp;
                                                console.log("ENTERED");
                                            }

                             
                                            for(var j=0;j<positive.length;j++){
                                                var temp="<div class='col-md-4'><div class='card'><h3 class='text-center '><font color='brown'><span style='font-weight:bold'></span></font></h3><h5 class='text-center '><font color='White'>"+SummaryUtil[positive[j]-1]+" </font></h5><div class='wrapper center'><button class='btn btn-danger down btn-lg text-center viewMore' type='button' id='viewMore_"+positive[j]+"'>Click to View Tweets</button></div></div> </div>";
                                                cardsContent+=temp;
                                            }
                                            $(".tweetContainer").hide();
                                            cardContainer=$("body .cardContainer")[0];
                                            cardContainer.innerHTML=cardsContent;
                                            $("body").removeClass("bodybg");
                                            $("body").addClass("bodybg2");

                                            // var p = $(".cardContainer");
                                            // var offset = p.offset();
                                            // window.scrollBy(offset.left, offset.top);
                                            // $("html, body").animate({scrollTop: 0 }, "slow");
        
                                        }});


                     
                                        
                    });

                $( "body" ).delegate( ".viewMore", "click", function() {
                   console.log(this);
                   var topicId=this.id.split("viewMore_")[1];
                   var qToAsk=$("#searchBox")[0].value;
                    $.ajax({
                                            url: "http://54.159.236.70:8983/solr/project4/select/?q=Topic:"+topicId+"%20AND%20text_en:"+encodeURI(qToAsk)+"&rows=20&wt=json", 
                                            success: function(result){
                                            console.log(result);
                                            responseJson=JSON.parse(result);
                                            console.log(responseJson);
                           
                                            $(".tweetContainer").show();
                                            
                                            var numOfTweets = responseJson.response.numFound;
                                            var tweetContent="";
                                            var docs = responseJson.response.docs;
                                            // var userName = responseJson.user.name;
                                            // var profilePic = responseJson.user.profile_image_url;

                                            if(numOfTweets>20)
                                                numOfTweets = 20;
                           
                                            var temp = "<input type='button' class='btn btn-danger btn-lg text-centre' value='Back to Summary' onclick='$(\"#searchButton\").click()' style='float:right'/><br/><br/><br/><br /><br/>";
                                            tweetContent+=temp;
                                            for(var j=0;j<numOfTweets;j++){

                                                var temp="<div class='col-sm-6'><div id='tb-testimonial' class='testimonial testimonial-primary'><div class='testimonial-section'>"+ docs[j].text_en+" </div><div class='testimonial-desc'><img src='" + docs[j].userProfilePic+"' alt='' /><div class='testimonial-writer'><div class='testimonial-writer-name'>"+docs[j].userName+"</div></div></div></div></div>";
                                                tweetContent+=temp;
                                            }
                                            $(".cardContainer").hide();
                                            //cardContainer=$("body .cardContainer")[0];
                                            //cardContainer.innerHTML="hide";
                                            tweetContainer=$("body .tweetContainer")[0];
                                            tweetContainer.innerHTML=tweetContent;
                                            $("body").removeClass("bodybg");
                                            $("body").addClass("bodybg2");
                                            // $("html, body").animate({scrollTop: 0 }, "slow");
                                            // var p1 = $(".tweetContainer");
                                            // var offset1 = p1.offset();
                                            // window.scrollBy(offset1.left, offset1.top);
                                            
        
                                        }});
                           

                });
            
              
                   

});
