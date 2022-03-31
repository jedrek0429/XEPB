# XEPB

## Start

There are two ways to start your bot

### The normal shell way

```sh
TOKEN='<bot token goes here>' npm start
```

### The Powershell way

```powershell
$env:TOKEN='<bot token goes here>';
npm start;
Remove-Item Env:\TOKEN
```

This command will build the project, compile it into `dist` folder, and run it!
