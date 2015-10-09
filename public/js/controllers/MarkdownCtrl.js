marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false, // if false -> allow plain old HTML ;)
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});
// Declare app level module which depends on views, and components
angular.module('MarkdownCtrl', ['ngSanitize'])
  .controller('markdownController',function($scope){
      var markdown = this;
      this.inputText = '';
      $scope.$watch('marked.inputText', function(current, original) {
        markdown.outputText = marked(current);
   });
});
