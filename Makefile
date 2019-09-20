TS = src/main.ts src/rotozoom.ts src/fire.ts src/plasma.ts src/blobs.ts \
		 src/tunnel.ts src/moire.ts src/rain.ts

.DELETE_ON_ERROR:

all: demo.js

demo.js: $(TS)
	tsc

check:
	tslint $(TS)

clean:
	rm -f demo.js
