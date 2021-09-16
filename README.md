# Schema-migrator

Execute `yarn install`

Configure the necessary environment variables `.env` file
```
FROM_HOST=host.com
FROM_PORT=3306
FROM_USER=myUser
FROM_PASS=superSecretPass
FROM_DB=schema1,schema2,schema3
TO_HOST=destinyHost.net
TO_PORT=3306
TO_USER=myOtherUser
TO_PASS=mySecretPass
LOG_LEVEL=debug // default info
ENVIRONMENT=LOCAL
```

## Dependency

It is necessary to have the schemas created within the target database.

### Log

Log have a JSON structure:

```json
{
  "time": "the execution time", 
  "env": "value of the environment variable",
  "level": "log level",
  "payload": "all data you put on log (message and metadata)"
}
```