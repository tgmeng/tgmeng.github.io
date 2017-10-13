document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('pre').forEach(function(pre) {
        var classList = pre.classList;
        classList.add('prettyprint');
        // classList.add('linenums');
    });
});
