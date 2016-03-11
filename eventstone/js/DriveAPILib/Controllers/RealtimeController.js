/**
  *DriveAPILib
  *
  * This file was automatically generated by APIMATIC BETA v2.0 on 03/09/2016
  */

'use strict';
angular.module('DriveAPILib').factory('RealtimeController',function($q,Configuration,HttpClient,APIHelper){
    return{
        /**
         * Exports the contents of the Realtime API data model associated with this file as JSON.
         * @param {string} fileId    Required parameter: The ID of the file that the Realtime API data model is associated with.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {int|null} revision    Optional parameter: The revision of the Realtime API data model to export. Revisions start at 1 (the initial empty data model) and are incremented with each change. If this parameter is excluded, the most recent data model will be returned.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<void>}
         */
        get : function(fileId, alt, fields, key, oauthToken, prettyPrint, quotaUser, revision, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/realtime";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
                "fields" : fields,
                "key" : key,
                "oauth_token" : oauthToken,
                "prettyPrint" : (null != prettyPrint)? prettyPrint: true,
                "quotaUser" : quotaUser,
                "revision" : revision,
                "userIp" : userIp
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);
            
            //prepare headers
            var headers = {
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
        },
        /**
         * Overwrites the Realtime API data model associated with this file with the provided JSON data model.
         * @param {string} fileId    Required parameter: The ID of the file that the Realtime API data model is associated with.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} baseRevision    Optional parameter: The revision of the model to diff the uploaded model against. If set, the uploaded model is diffed against the provided revision and those differences are merged with any changes made to the model after the provided revision. If not set, the uploaded model replaces the current model on the server.
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<void>}
         */
        update : function(fileId, alt, baseRevision, fields, key, oauthToken, prettyPrint, quotaUser, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/realtime";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
                "baseRevision" : baseRevision,
                "fields" : fields,
                "key" : key,
                "oauth_token" : oauthToken,
                "prettyPrint" : (null != prettyPrint)? prettyPrint: true,
                "quotaUser" : quotaUser,
                "userIp" : userIp
            });

            //validate and preprocess url
            var queryUrl = APIHelper.cleanUrl(queryBuilder);
            
            //prepare headers
            var headers = {
                "Authorization" : "Bearer " + Configuration.oAuthAccessToken
            };

            //prepare and invoke the API call request to fetch the response
            var config = {
                method : "PUT",
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