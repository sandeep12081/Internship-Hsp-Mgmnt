## MongoDB connection

The backend reads MongoDB from `MONGODB_URI`.

Default:

```powershell
mongodb://127.0.0.1:27017/hospitalDB
```

Run with local MongoDB:

```powershell
cd C:\Hospital_Mgmnt\backend
npm start
```

Run with a custom MongoDB connection string:

```powershell
$env:MONGODB_URI="your-mongodb-connection-string"
npm start
```

Example for MongoDB Atlas:

```powershell
$env:MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/hospitalDB?retryWrites=true&w=majority"
npm start
```
