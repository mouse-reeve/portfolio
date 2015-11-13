# angular-flasker
Converts all words in a dom element to "flask"

## Usage

```
<div smhm-flask toggle="{{toggleVariable}}">
  <p>The quick brown fox jumps over the lazy dog.</p>
</div>
```

Assuming you have a boolean `toggleVariable` in your controller, the `p` text will appear as "The quick brown fox jumps over the lazy dog.." when `toggleVariable` is `False` and "The flask flask flask flasks flask the flask flask." when `toggleVariable` is `True`.

Bower installation: `bower install mouse-reeve/angular-flasker`
