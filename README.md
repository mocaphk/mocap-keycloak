# mocap-keycloak

For storing realm data and create keycloak container.

> [!WARNING]  
> The `mocap-dev-realm.json` is for development / demonstration only. DO NOT use this configuration in production.

## How to start

If you are using Windows, you need to use WSL.

1. Build the docker image.

```bash
docker-compose build
```

2. Run the docker image.

```bash
docker-compose up
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

```bash
/opt/keycloak/bin/kc.sh export --dir /opt/keycloak/data/import --realm mocap-dev --users realm_file
```

Now the realm data is in `/opt/keycloak/data/import/mocap-dev-realm.json`

2. To copy the file from the container to local machine, type the following on your local machine:

```bash
docker cp mocap-keycloak:/opt/keycloak/data/import/mocap-dev-realm.json <local_destination>
```

3. Copy the file to `./realms`.
4. Run `py ./src/scripts/removeRealmSensitiveData.py` to replace all sensitive data with environment variables.

> [!WARNING]  
> When importing data (in `Dockrerfile`), some data would be replaced by the environment variables. For example, `smtpServer.password` uses `SMTP_PASSWORD`.
> Therefore, when you export the realm data, you will export secrets. DO NOT PUSH THOSE SECRETS TO THE REPOSITORY. Please replace those secrets with the enironment
> variable with the script above.

> [!NOTE]  
> You can check which values are replaced in `./realms/sensitive-data-map.json`.

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

### Build the theme jar locally

To build the custom theme, **maven** is needed.

### WSL

> [!WARNING]  
> Do not download maven with apt package manager because it does not work for some reason.

```bash
wget https://www.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz -P /tmp

sudo tar xf /tmp/apache-maven-*.tar.gz -C /opt

sudo update-alternatives --install /usr/bin/mvn mvn /opt/apache-maven-3.9.6/bin/mvn 363

sudo update-alternatives --config mvn

mvn --version
```

1. Install all dependencies.

```bash
npm install
```

2. Build the React app.

```bash
npm run build
```

3. Creating a `.jar` file for keycloak theme using keycloakify.

```bash
npm run build-theme-jar
```

### Developing the theme

Currently not all the pages has custom theme. When developing the page, you need to know its structure. You can find the structure of the page [here](https://github.com/keycloak/keycloak/tree/78866df6d5053780bc9184fbdf7682f708147117/themes/src/main/resources/theme/base/login) or [here](https://github.com/keycloakify/keycloakify/tree/main/src/login/pages).

1. Install all dependencies.

```bash
npm install
```

2. Clone all keycloak resources. You would see a folder `keycloak-resources` in `public` folder.

```bash
npm run clone-resources
```

3. Start the React app.

```bash
npm run start
```

4. Change the `mockPageId` in `src/keycloak-theme/login/kcContext.ts` based on which page you want to edit. For example, if you want to edit the login page, change the `mockPageId` to `login.ftl`.

```typescript
export const { kcContext } = getKcContext({
    // Uncomment to test the login page for development.
    mockPageId: "login.ftl",
});
```
