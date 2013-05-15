all: clean install test

install:
	@npm install

clean:
	@rm -f ./tmp/dst/*
	@rm -rf node_modules

test:
	@rm -f ./tmp/dst/*
	@./node_modules/mocha/bin/mocha -R spec

.PHONY: all install clean test