const Asana = require('asana');
const dotenv = require("dotenv").config()
// Using a PAT for basic authentication. This is reasonable to get
// started with, but Oauth is more secure and provides more features.

var client = Asana.Client.create().useAccessToken(process.env.ASANA_ACCESS_TOKEN);
var userId;
let user_Obj = {}

client.users.me()
  .then(user => {

    userId = user.gid;
    user_Obj.workspaces = user.workspaces
    
    user_Obj.workspaces.map((workspace, index) => {
      client.projects.getProjectsForWorkspace(workspace.gid)
        .then((workspaceResult) => {
          
          user_Obj.workspaces[index].project =  workspaceResult.data
          console.dir(user_Obj, {depth:null})
          workspaceResult.data.map((project, pindex) => {
            client.tasks.getTasksForProject(project.gid)
            .then(projectResult => { 
              user_Obj.workspaces[index].project[pindex].tasks =  projectResult.data
              console.dir(user_Obj, {depth:null})
            })
          })
        });
      })
  })

