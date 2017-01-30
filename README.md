# reimagined-pancake  
[![Build Status](https://travis-ci.org/chgibb/reimagined-pancake.svg?branch=master)](https://travis-ci.org/chgibb/reimagined-pancake)[![Dependency Status](https://gemnasium.com/badges/github.com/chgibb/reimagined-pancake.svg)](https://gemnasium.com/github.com/chgibb/reimagined-pancake)  
Author: Chris Gibb  
Twitter scraper and natural language processing platform.  

Command line interface (CLI) based platform for high volume Twitter analytics.

# Software Requirements:  
- Linux based Operating System (OS)
- NodeJS (https://nodejs.org/en/download/)
- Java (http://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) (Optional, only needed for built in text analytics)
- Familiarity with the CLI

# Minimum Recommended Hardware Requirements
- Intel Celeron 2x Core @ 1.4GhZ
- 2GB RAM
- 500GB - 1TB disk space (depends on length of use and intentions)

# Guides
* [Getting Started]()

# Building From Source
From the directory where the source was cloned into:  

Install dependencies
```
bash install.bash
```

Build everything
```
bash build.bash
```

# Architectural Overview 
#### Definitions
- Binary
    - Any file which may be executed.
We attempt to follow (as much as possible, anyway) the Unix philosphy of micro services,
that is, one binary to do one thing. Each binary (defined here as any binary 
WinPE/ELF binary executable or .so/.dll, any JRE .jar/.class, NodeJS .node/.js files)

