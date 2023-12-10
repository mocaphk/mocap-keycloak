FROM quay.io/keycloak/keycloak:22.0.4

USER root

RUN mkdir -p /opt/keycloak_import/

# Make the realm configuration available for import
COPY mocap-dev-realm.json /opt/keycloak_import/

# Import the realm and user of development environment
RUN /opt/keycloak/bin/kc.sh import --file /opt/keycloak_import/mocap-dev-realm.json

# The Keycloak server is configured to listen on port 8080
EXPOSE 8080

# Import the realm on start-up
CMD ["start-dev"]