# Guard Account Manager
This is an account manager service. It's a part of an SSO network.

## How does it work?
1. When a user reaches a service that is a part of this SSO network (such as [this](https://github.com/danielmitrov/guard-service-example)), he is being redirected to the Account Manager.
2. The Account Manager checks if there are valid cookies.
   - If so- the user will be redirected back to the service he came from with an identifier token.
   - If there are no valid cookies, the Account Manager asks the user to login, generates a token and then redirects him back to the service he came from.
   
The service should trust the Account Manager and verifies the token he got using the keys that the Account Manager publishes in `GET /api/v1/keys/`.

Then, the user is logged in successfully!

![Login Page](https://i.imgur.com/fTGpnUf.png)
