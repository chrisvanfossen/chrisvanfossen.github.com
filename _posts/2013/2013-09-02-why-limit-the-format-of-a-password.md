---
layout: post
title:  Why Limit the Format of a Password?
---

I’ve been moving towards using longer and longer passwords. When I say longer, I mean upwards of over 20 characters, mixed case, number and special characters. These passwords make me feel secure, especially when I can also leverage two-factor authentication on top of it. Know what doesn’t make me feel secure? When a website limits the length and/or what characters can be used in the password.

So who’s the offender that’s prompted me to write this blog post? It’s major financial institute Bank of America. Why would one of the largest banks in the world do such a thing? Let’s take a look at the format requirements for Bank of America’s Online Banking passcodes (I went ahead and bolded the good and italicized the bad):

* Must be between **8** and _20_ characters
* **Include at least 1 number and 1 letter**
* _Not contain any spaces_
* _Not contain the characters $ &lt; &gt; &amp; ^ ! [ ]_
* **Not be the same as your Online Banking ID**
* **Will be case-sensitive**

The bolded requirements are all legit, I’d even go as far as to say that the minimum length for your banking password should be at least 10 to 12 characters. What throws me is the maxmimum length and limiting what characters can be in the password. I’ll assume that perhaps limiting those characters has something to do with customer service and limiting the number of support tickets they receive because someone fat fingered a space or some 1337 user decided to swap “S” for “$” and forgot about it. If that is the case, why are they not limiting all special characters? Perhaps those special characters hold some deeper meaning in their system.

So why the limit on the maximum length? If you are going to limit it, why not make it a length that most users are unlikely to hit. I know I’m already in the minority by using exceptionally long passwords, but I can’t imagine that I’m the only person that has run into these limits. So what’s the reason for the limit? Is it the same as my theory about the special characters, perhaps they want limit their support issues? Their site has a password reset, so I have to imagine that most of those potential tickets are mitigated without involving the support team (I could be mistaken, I know how users can be ;)

Let’s get a bit more technical on this, passwords should never be stored in plain text, am I right? So if they aren’t storing the passwords in plain text they are either using a one-way hash function or some sort of encryption. Encrypting the passwords would be implying that the password could later be decrypted, so let’s throw that out and hope that they aren’t actually doing that. So with one-way hashing (regardless of how many times you run it through the algorithm or how many different salts you use) is going to result in a fixed length string. So if the password hashes are always X characters long, why would you ever limit the length of the password?

In Bank of America’s defense, they do offer two-factor authentication via their SafePass system (code is sent to your celly via SMS) and the older SiteKey (image and text you must verify as your own) to add additional security on top of their obscurely limited passwords.

Just so I don’t get called out as a hypocrite, I do generally limit password length on my own sites to 32 characters but never impose any limits on what characters can be used (never received a complaint on the matter, either). Also keep in mind, I don’t run any online banking systems, so the level of security needed pales in comparison to what Bank of America should be providing in way of password security. I’m unsure what percentage of their users are using SafePass, but I have to imagine that the majority of their online banking customers are password (with SiteKey) only for their authentication.

I hate to pick on Bank of America, but they were the most notable offender with limiting passwords that I have come across. In fact, many of the other sites I was checking up on today have since lifted their password limits!

What are your thoughts on this limiting of passwords? Anyone from Bank of America care to demystify the reasons for these limits? Comment below and Happy Labor Day!
