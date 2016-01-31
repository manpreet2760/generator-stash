/**
 * Created by manpreetsinghbedi on 31/01/16.
 */
var generators = require('yeoman-generator');
module.exports = generators.Base.extend({
    prompting: function () {
        var done = this.async();
        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'What\'s your project name?',
                default: 'stash'
            }];

        this.prompt(prompts, function (answers) {
            this.appname = answers.projectName;
            done();
        }.bind(this));
    },
    configuring: function () {
        this.config.set({
            projectName: this.appname,
        });

        this.copy('gitignore', '.gitignore');
    },
    writing: {
        writeGulp: function () {
            this.copy('_gulpfile.js', 'gulpfile.js');
        },
        writeBower: function () {
            var bower = {
                name: this.appname,
                private: true,
                dependencies: {
                    "angular": "~1.4.0",
                    "angular-ui-router": "~0.2.15",
                    "angular-route": "~1.4.0",
                    "angular-animate": "~1.4.0",
                    "angular-aria": "^1.4.0",
                    "angular-messages": "^1.4.0",
                    "angular-ui-bootstrap": "~1.1.0",
                    "angular-material": "0.11.2"
                }
            };
            this.write('bower.json', JSON.stringify(bower, null, 2));
        },
        writePackage: function () {
            this.copy('_package.json', 'package.json');
        },
        writeSource : function()
        {
            this.directory('src/', 'src/');
        }
    }
});