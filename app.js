const Asana = require('asana');
const util = require('util');
var client = Asana.Client.create().useAccessToken("1/1203033939170955:929b98ed3a758fd63520c7528ea0c79b");
var userId;
var workspaceId;
client.users.me()
  .then(user => {
    userId = user.gid;
    console.log("User details:", user)
    workspaceId = user.workspaces[0].gid;
    return client.projects.findAll({
      assignee: userId,
      workspace: workspaceId
    });
  })
  .then(async response => {
    console.log("Projects: ",response.data)
    return client.tasks.getTasksForProject(response.data[0].gid)
    .then((result) => {
        console.log("Here are the tasks: ", result.data);
    });
  })
  .catch(e => {
    console.log(e);
  });