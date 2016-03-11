/**
  *DriveAPILib
  *
  * This file was automatically generated by APIMATIC BETA v2.0 on 03/09/2016
  */

'use strict';
angular.module('DriveAPILib').factory('ChannelsController',function($q,Configuration,HttpClient,APIHelper){
    return{
        /**
         * Stop watching resources through this channel
         *
         * @return {promise<void>}
         */
        createStop : function(){

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/channels/stop";
            
            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);
            
            //prepare headers
            var headers = {
                "Authorization" : "Bearer " + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method : "POST",
                queryUrl : queryUrl,
                headers: headers,
            };
            
            var response = HttpClient(config);
                    
            //Create promise to return
            var deffered= $q.defer();
                    
            //process response
            response.then(function(result){
                deffered.resolve(result.body);
            },function(result){
                //Error handling for custom HTTP status codes
                deffered.reject(APIHelper.appendContext({errorMessage:"HTTP Response Not OK", errorCode: result.code, errorResponse: result.message},result.getContext()));
            });
            
            return deffered.promise;
        }
    }
});