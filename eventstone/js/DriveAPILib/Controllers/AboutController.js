/**
  *DriveAPILib
  *
  * This file was automatically generated by APIMATIC BETA v2.0 on 03/09/2016
  */

'use strict';
angular.module('DriveAPILib').factory('AboutController',function($q,Configuration,HttpClient,APIHelper){
    return{
        /**
         * Gets the information about the current user along with Drive API settings
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {bool|null} includeSubscribed    Optional parameter: When calculating the number of remaining change IDs, whether to include public files the user has opened and shared files. When set to false, this counts only change IDs for owned files and any shared or public files that the user has explicitly added to a folder they own.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} maxChangeIdCount    Optional parameter: Maximum number of remaining change IDs to count
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {string|null} startChangeId    Optional parameter: Change ID to start counting from when calculating number of remaining change IDs
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<About>}
         */
        get : function(alt, fields, includeSubscribed, key, maxChangeIdCount, oauthToken, prettyPrint, quotaUser, startChangeId, userIp){
            //Assign default values
            alt = alt || "json";
            includeSubscribed = includeSubscribed || true;
            maxChangeIdCount = maxChangeIdCount || "1";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/about";
            
            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
                "fields" : fields,
                "includeSubscribed" : (null != includeSubscribed)? includeSubscribed: true,
                "key" : key,
                "maxChangeIdCount" : (null != maxChangeIdCount)? maxChangeIdCount: "1",
                "oauth_token" : oauthToken,
                "prettyPrint" : (null != prettyPrint)? prettyPrint: true,
                "quotaUser" : quotaUser,
                "startChangeId" : startChangeId,
                "userIp" : userIp
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);
            
            //prepare headers
            var headers = {
                "accept" : "application/json",
                "Authorization" : "Bearer " + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method : "GET",
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