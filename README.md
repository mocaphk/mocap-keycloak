# mocap-keycloak

For storing realm data and create keycloak container.

> [!WARNING]  
> The `mocap-dev-realm.json` is for development / demonstration only. DO NOT use this configuration in production.

## How to start

1.

```
sudo docker build -t mocap/keycloak:latest .
```

2.

```
docker run --name mocap-keycloak -p 8888:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin mocap/keycloak:latest
```

3. Go to `http://localhost:8888/`. Click **Adminstration Console**. The username and password are `admin` by default.

4. Choose `mocap` realm from the dropdown in the navigation bar on the left.

5. You can now configure the realm!

## Default users

There are some default users that has already been created:

1. `admin`, `lecturer`, `tutor`, and `student`. They have a role equals to their name.
2. `eddie`, `harry`, `john`, and `edmond`. They have no role.

> [!NOTE]  
> Their passwords are equal to their username.

## How to add roles to a user

1. Go to **Users** -> **Users list**.
2. Click the target user.
3. Click **Role mapping**.
4. Click **Assign role**.
5. Click `admin`, `lecturer`, `tutor`, or/and `student`.

## How to export a realm

1. Open terminal in the docker container. Type:

```
/opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/import --realm mocap-dev --users realm_file
```

Now the realm data is in `/opt/keycloak/data/import/mocap-dev-realm.json`

2. To copy the file from the container to local machine, type the following on your local machine:

```
docker cp mocap-keycloak:/opt/keycloak/data/import/mocap-dev-realm.json <local_destination>
```

## How to find those environment variables related to keycloak

### Frontend

| Environment Variable     | Value / Where to find them                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `KEYCLOAK_URL`           | `http://localhost:8888/`                                                                                      |
| `KEYCLOAK_CLIENT_ID`     | `mocap-frontend` (Can be found in **Clients** -> **Clients list**)                                            |
| `KEYCLOAK_CLIENT_SECRET` | Can be found in **Clients** -> **Clients list** -> **mocap-frontend** -> **Credentials** -> **Client secret** |
| `KEYCLOAK_REALM`         | `mocap`                                                                                                       |

### Backend

| Environment Variable                                    | Value / Where to find them                                                              |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `keycloak.uri`                                          | `http://localhost:8888/`                                                                |
| `keycloak.realm`                                        | `mocap`                                                                                 |
| `keycloak.clientId`                                     | `mocap-backend` (Can be found in **Clients** -> **Clients list**)                       |
| `spring.security.oauth2.resourceserver.jwt.issuer-uri`  | `${keycloak.uri}/realms/${keycloak.realm}`                                              |
| `spring.security.oauth2.resourceserver.jwt.jwk-set-uri` | `${spring.security.oauth2.resourceserver.jwt.issuer-uri}/protocol/openid-connect/certs` |
