Initial attempt at creating a utility to tag bins based on tags learned from binTagger.js and Stanford NER. Ran into issues with writing UTF8 strings to files, resulting in most tags entity properties being set to some jumbled unicode constants translated to ASCII. Abandoned for the moment. I'm going to leave it here in the hope it will be revived/be useful for others.

A clone was created in TypeScript which is a little over 3x slower. Hopefully the UTF8 issues can be figured out for the sake of speed.
