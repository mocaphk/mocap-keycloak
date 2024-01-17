FROM node:18 as keycloakify_jar_builder

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

# Download maven
RUN : \ 
    && apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    default-jre \
    wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && :

RUN : \
    && wget https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.tar.gz -P /tmp \
    && tar xf /tmp/apache-maven-*.tar.gz -C /opt \
    && update-alternatives --install /usr/bin/mvn mvn /opt/apache-maven-3.9.6/bin/mvn 363 \
    && update-alternatives --config mvn \
    && :

# Build the jar
WORKDIR /opt/app

COPY . /opt/app/

RUN npm ci

RUN npm run build && npm run build-theme-jar

FROM quay.io/keycloak/keycloak:22.0.4

WORKDIR /opt/keycloak

# Copy the theme jar to builder
COPY --from=keycloakify_jar_builder --chown=keycloak:keycloak /opt/app/build_keycloak/target/mocap-keycloak-theme-0.1.0.jar /opt/keycloak/providers

# Make the realm configuration available for import
RUN mkdir -p /opt/keycloak/data/import
COPY --chown=keycloak:keycloak realms/mocap-dev-realm.json  /opt/keycloak/data/import
