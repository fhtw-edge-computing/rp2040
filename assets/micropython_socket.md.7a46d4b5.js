import{_ as s,o as n,c as a,d as l}from"./app.511168c8.js";const o="/rp2040/img/socket.svg",d=JSON.parse('{"title":"Socket","description":"","frontmatter":{},"headers":[{"level":2,"title":"Clients","slug":"clients","link":"#clients","children":[]},{"level":2,"title":"Servers","slug":"servers","link":"#servers","children":[]}],"relativePath":"micropython/socket.md","lastUpdated":1673917205000}'),p={name:"micropython/socket.md"},e=l(`<h1 id="socket" tabindex="-1">Socket <a class="header-anchor" href="#socket" aria-hidden="true">#</a></h1><p>A <em>network socket</em> is a data structure representing an endpoint for sending and receiving data across a TCP/IP network. A socket is composed of three values to identify an endpoint: transport protocol, IP address, and port number.</p><p>The MicroPython library <code>usocket</code> or <code>socket</code> provides two main objects, the function <code>getaddrinfo</code> and the class <code>socket</code>):</p><p>The function <code>getaddrinfo</code> translates the host/port argument into a sequence of 5-tuples that contain all the necessary arguments for creating a socket connected to that service.</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> usocket </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> getaddrinfo</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> port </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www.google.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Resolve hostname and port to a list of address information</span></span>
<span class="line"><span style="color:#A6ACCD;">infos </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getaddrinfo</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">host</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> port</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">af</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">type</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">proto</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> </span><span style="color:#A6ACCD;font-style:italic;">flags</span><span style="color:#89DDFF;">=</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># getaddrinfo returns 5-tuple containing:</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">#   (family, type, proto, canonname, sockaddr)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#A6ACCD;"> info </span><span style="color:#89DDFF;font-style:italic;">in</span><span style="color:#A6ACCD;"> infos</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Family: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">, Type: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Protocol: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">2</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">, Canonical Name: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">3</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;IP: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">][</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">, Port: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">info</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">4</span><span style="color:#89DDFF;">][</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>Class <code>socket</code> allows for creating an object representing and network endpoint to <em>send</em> and <em>receive</em> data.</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> usocket </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> socket</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> SOCK_STREAM</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Create a new socket (TCP, UDP)</span></span>
<span class="line"><span style="color:#A6ACCD;">endpoint </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">socket</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> SOCK_STREAM</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>To create a socket, the <em>address family</em> and <em>socket type</em> need to be specified.</p><table><thead><tr><th style="text-align:left;">Type (Value)</th><th style="text-align:left;">Address Family</th></tr></thead><tbody><tr><td style="text-align:left;"><code>AF_INET(2)</code></td><td style="text-align:left;">Internet Protocol v4 address.</td></tr><tr><td style="text-align:left;"><code>AF_INET6(10)</code></td><td style="text-align:left;">Internet Protocol v6 address.</td></tr></tbody></table><table><thead><tr><th style="text-align:left;">Type (Value)</th><th style="text-align:left;"></th></tr></thead><tbody><tr><td style="text-align:left;"><code>SOCK_STREAM(1)</code></td><td style="text-align:left;">Provides sequenced, reliable, bidirectional, connection-mode byte streams, and may provide a transmission mechanism for out-of-band data. Used for TCP connections.</td></tr><tr><td style="text-align:left;"><code>SOCK_DGRAM(2)</code></td><td style="text-align:left;">Provides datagrams, which are connectionless-mode, unreliable messages of fixed maximum length. Used for UDP connections.</td></tr><tr><td style="text-align:left;"><code>SOCK_RAW(3)</code></td><td style="text-align:left;">Provides raw data for alternatives for TCP and UDP.</td></tr></tbody></table><p>This sets the addressing scheme of the network endpoint and specifies the transport protocol.</p><p>From this point on, clients and servers use different methods to establish a connection. After connection, client and server communicate using <code>read()</code> and <code>write()</code> (see <a href="#socket" class="figure-reference">Figure 1</a>).</p><p><figure id="socket"><img src="`+o+`" alt="Server/Client communication with socket API" title="Server/Client communication with Socket API"><figcaption><a href="#socket" class="label">Figure 1</a>: Server/Client communication with Socket API</figcaption></figure></p><h2 id="clients" tabindex="-1">Clients <a class="header-anchor" href="#clients" aria-hidden="true">#</a></h2><p>Clients can use the <code>connect()</code> method to establish a connection to a server.</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> usocket </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> getaddrinfo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> socket</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> SOCK_STREAM</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Connect to a network</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ...</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set host and port</span></span>
<span class="line"><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> port </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www.google.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Retrieve address and port via DNS</span></span>
<span class="line"><span style="color:#A6ACCD;">infos </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getaddrinfo</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">host</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> port</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Create a TCP/IP socket</span></span>
<span class="line"><span style="color:#A6ACCD;">sock </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">socket</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> SOCK_STREAM</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Connect to first entry</span></span>
<span class="line"><span style="color:#A6ACCD;">sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">connect</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">infos</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">])</span></span>
<span class="line"></span></code></pre></div><p>After that, the client can use <code>write()</code> and <code>read()</code> calls to communicate with the server over the socket.</p><details class="details custom-block"><summary>Click me to view the complete code</summary><div class="language-python line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> network </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> STA_IF</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> WLAN</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> usocket </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> getaddrinfo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> socket</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> SOCK_STREAM</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Connect to a network</span></span>
<span class="line"><span style="color:#A6ACCD;">ssid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">SSID</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">pwd </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">PWD</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">wlan </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WLAN</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">STA_IF</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">active</span><span style="color:#89DDFF;">(True)</span></span>
<span class="line"><span style="color:#A6ACCD;">wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">connect</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">ssid</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> pwd</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">not</span><span style="color:#A6ACCD;"> wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isconnected</span><span style="color:#89DDFF;">():</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">idle</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;</span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">ssid</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;"> connection succeeded!&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Wi-Fi connected </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ifconfig</span><span style="color:#89DDFF;">()</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set host and port</span></span>
<span class="line"><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> port </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www.google.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Retrieve address and port via DNS</span></span>
<span class="line"><span style="color:#A6ACCD;">infos </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getaddrinfo</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">host</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> port</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Create a TCP/IP socket</span></span>
<span class="line"><span style="color:#A6ACCD;">sock </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">socket</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> SOCK_STREAM</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Connect to first entry</span></span>
<span class="line"><span style="color:#A6ACCD;">sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">connect</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">infos</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">])</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div></details><p><code>host</code> and <code>port</code> in this example, specifiy the URL or <em>domain name</em> and <em>port</em> of a HTTP server.</p><p>HTTP server use a rather simple request/response schema to communicate with clients. To get a <em>response</em> from the HTTP server, one has to send a <em>request</em>.</p><div class="language-python"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;"># Send HTTP GET request</span></span>
<span class="line"><span style="color:#A6ACCD;">request </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">GET / HTTP/1.1</span><span style="color:#A6ACCD;">\\n\\n</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Client: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">request</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">write</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">request</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Receive HTTP response</span></span>
<span class="line"><span style="color:#A6ACCD;">response </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">read</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1024</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Convert bytes to string and print first line</span></span>
<span class="line"><span style="color:#A6ACCD;">first_line </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">decode</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">utf-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">split</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Server: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">first_line</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># prints: &quot;Server: HTTP/1.1 200 OK&quot;</span></span>
<span class="line"></span></code></pre></div><details class="details custom-block"><summary>Click me to view the complete code</summary><div class="language-python line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> network </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> STA_IF</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> WLAN</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> usocket </span><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> getaddrinfo</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> socket</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> SOCK_STREAM</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Connect to a network</span></span>
<span class="line"><span style="color:#A6ACCD;">ssid </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">SSID</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">pwd </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">PWD</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">wlan </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">WLAN</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">STA_IF</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">active</span><span style="color:#89DDFF;">(True)</span></span>
<span class="line"><span style="color:#A6ACCD;">wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">connect</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">ssid</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> pwd</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">while</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">not</span><span style="color:#A6ACCD;"> wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isconnected</span><span style="color:#89DDFF;">():</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#82AAFF;">idle</span><span style="color:#89DDFF;">()</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;</span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">ssid</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;"> connection succeeded!&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Wi-Fi connected </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">wlan</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ifconfig</span><span style="color:#89DDFF;">()</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Set host and port</span></span>
<span class="line"><span style="color:#A6ACCD;">host</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> port </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">www.google.com</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">80</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Retrieve address and port via DNS</span></span>
<span class="line"><span style="color:#A6ACCD;">infos </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">getaddrinfo</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">host</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> port</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Create a TCP/IP socket</span></span>
<span class="line"><span style="color:#A6ACCD;">sock </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">socket</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">AF_INET</span><span style="color:#89DDFF;">,</span><span style="color:#82AAFF;"> SOCK_STREAM</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Connect to first entry</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Connecting to client </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">infos</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;"> ...&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">connect</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">infos</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">][-</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Send HTTP GET request</span></span>
<span class="line"><span style="color:#A6ACCD;">request </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">GET / HTTP/1.1</span><span style="color:#A6ACCD;">\\n\\n</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Client: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">request</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">write</span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">request</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Receive HTTP response</span></span>
<span class="line"><span style="color:#A6ACCD;">response </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> sock</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">read</span><span style="color:#89DDFF;">(</span><span style="color:#F78C6C;">1024</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Convert bytes to string and print first line</span></span>
<span class="line"><span style="color:#A6ACCD;">first_line </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> response</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">decode</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">utf-8</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#82AAFF;">split</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#82AAFF;">print</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">f</span><span style="color:#C3E88D;">&quot;Server: </span><span style="color:#F78C6C;">{</span><span style="color:#82AAFF;">first_line</span><span style="color:#F78C6C;">}</span><span style="color:#C3E88D;">&quot;</span><span style="color:#89DDFF;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div></details><h2 id="servers" tabindex="-1">Servers <a class="header-anchor" href="#servers" aria-hidden="true">#</a></h2><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>🚧 Website is currently under construction 🚧</p></div>`,24),t=[e];function c(r,F,y,D,i,A){return n(),a("div",null,t)}const u=s(p,[["render",c]]);export{d as __pageData,u as default};
