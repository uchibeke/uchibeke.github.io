/**
  *DriveAPILib
  *
  * This file was automatically generated by APIMATIC BETA v2.0 on 03/09/2016
  */

'use strict';
angular.module('DriveAPILib').factory('PermissionsController',function($q,Configuration,HttpClient,APIHelper){
    return{
        /**
         * Deletes a permission from a file.
         * @param {string} fileId    Required parameter: The ID for the file.
         * @param {string} permissionId    Required parameter: The ID for the permission.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<void>}
         */
        mdelete : function(fileId, permissionId, alt, fields, key, oauthToken, prettyPrint, quotaUser, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/permissions/{permissionId}";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId,
                "permissionId" : permissionId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
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
                method : "DELETE",
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
         * Gets a permission by ID.
         * @param {string} fileId    Required parameter: The ID for the file.
         * @param {string} permissionId    Required parameter: The ID for the permission.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<Permission>}
         */
        get : function(fileId, permissionId, alt, fields, key, oauthToken, prettyPrint, quotaUser, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/permissions/{permissionId}";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId,
                "permissionId" : permissionId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
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
        },
        /**
         * Returns the permission ID for an email address.
         * @param {string} email    Required parameter: The email address for which to return a permission ID
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<PermissionId>}
         */
        getIdForEmail : function(email, alt, fields, key, oauthToken, prettyPrint, quotaUser, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/permissionIds/{email}";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "email" : email
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
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
        },
        /**
         * Inserts a permission for a file.
         * @param {string} fileId    Required parameter: The ID for the file.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} emailMessage    Optional parameter: A custom message to include in notification emails.
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {bool|null} sendNotificationEmails    Optional parameter: Whether to send notification emails when sharing to users or groups. This parameter is ignored and an email is sent if the role is owner.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<Permission>}
         */
        insert : function(fileId, alt, emailMessage, fields, key, oauthToken, prettyPrint, quotaUser, sendNotificationEmails, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;
            sendNotificationEmails = sendNotificationEmails || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/permissions";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
                "emailMessage" : emailMessage,
                "fields" : fields,
                "key" : key,
                "oauth_token" : oauthToken,
                "prettyPrint" : (null != prettyPrint)? prettyPrint: true,
                "quotaUser" : quotaUser,
                "sendNotificationEmails" : (null != sendNotificationEmails)? sendNotificationEmails: true,
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
        },
        /**
         * Lists a file's permissions.
         * @param {string} fileId    Required parameter: The ID for the file.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<PermissionList>}
         */
        list : function(fileId, alt, fields, key, oauthToken, prettyPrint, quotaUser, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/permissions";
            
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
        },
        /**
         * Updates a permission using patch semantics.
         * @param {string} fileId    Required parameter: The ID for the file.
         * @param {string} permissionId    Required parameter: The ID for the permission.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {bool|null} transferOwnership    Optional parameter: Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<Permission>}
         */
        patch : function(fileId, permissionId, alt, fields, key, oauthToken, prettyPrint, quotaUser, transferOwnership, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;
            transferOwnership = transferOwnership || false;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/permissions/{permissionId}";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId,
                "permissionId" : permissionId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
                "fields" : fields,
                "key" : key,
                "oauth_token" : oauthToken,
                "prettyPrint" : (null != prettyPrint)? prettyPrint: true,
                "quotaUser" : quotaUser,
                "transferOwnership" : (null != transferOwnership)? transferOwnership: false,
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
                method : "PATCH",
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
         * Updates a permission.
         * @param {string} fileId    Required parameter: The ID for the file.
         * @param {string} permissionId    Required parameter: The ID for the permission.
         * @param {string|null} alt    Optional parameter: Data format for the response. (Acceptable values are: "json")
         * @param {string|null} fields    Optional parameter: Selector specifying which fields to include in a partial response.
         * @param {string|null} key    Optional parameter: API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
         * @param {string|null} oauthToken    Optional parameter: OAuth 2.0 token for the current user.
         * @param {bool|null} prettyPrint    Optional parameter: Returns response with indentations and line breaks.
         * @param {string|null} quotaUser    Optional parameter: Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. Overrides userIp if both are provided.
         * @param {bool|null} transferOwnership    Optional parameter: Whether changing a role to 'owner' downgrades the current owners to writers. Does nothing if the specified role is not 'owner'.
         * @param {string|null} userIp    Optional parameter: IP address of the site where the request originates. Use this if you want to enforce per-user limits.
         *
         * @return {promise<Permission>}
         */
        update : function(fileId, permissionId, alt, fields, key, oauthToken, prettyPrint, quotaUser, transferOwnership, userIp){
            //Assign default values
            alt = alt || "json";
            prettyPrint = prettyPrint || true;
            transferOwnership = transferOwnership || false;

            //prepare query string for API call
            var baseUri = Configuration.BASEURI
            var queryBuilder = baseUri + "/files/{fileId}/permissions/{permissionId}";
            
            //Process template parameters
            queryBuilder = APIHelper.appendUrlWithTemplateParameters(queryBuilder, {
                "fileId" : fileId,
                "permissionId" : permissionId
            });

            //Process query parameters
            queryBuilder = APIHelper.appendUrlWithQueryParameters(queryBuilder, {
                "alt" : (null != alt)? alt: "json",
                "fields" : fields,
                "key" : key,
                "oauth_token" : oauthToken,
                "prettyPrint" : (null != prettyPrint)? prettyPrint: true,
                "quotaUser" : quotaUser,
                "transferOwnership" : (null != transferOwnership)? transferOwnership: false,
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