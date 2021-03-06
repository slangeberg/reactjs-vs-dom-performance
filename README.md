#React JS vs DOM JS Throwdown
<p>
  These demo apps generate results for article at <a href="https://objectpartners.com/?p=13315" target="_blank" alt="https://objectpartners.com/2015/11/19/comparing-react-js-performance-vs-native-dom">Comparing React.js performance vs. native DOM</a>
</p>

<p>Tested with:
<ul>
	<li>node: v5.0.0</li>
	<li>npm: 3.3.9</li>
	<li>Chrome 46.0.x</li>
</ul>

<p>Assuming you’ve already installed Node / NPM, you will probably need to install local dependencies for the project, such as:</p>

<pre><code>$ npm install browserify babelify react react-dom watchify --save</code></pre>
   
<p>React.js app is written with JSX in a CommonJS module and precompiled to vanilla JS by running:</p>
<pre><code>$ npm run start-dom</code></pre>
and:
<pre><code>$ npm run start-react</code></pre>

<p>If you'd like to run from a web server, and have Python installed, you can run:</p>
<pre><code>$ python -m SimpleHTTPServer 8888</code></pre>
