all: clean install test

install:
	@npm install

clean:
	@rm -f ./tmp/dst/*
	@rm -rf node_modules

test:
	@rm -rf ./tmp/dst
	@mkdir ./tmp/dst
	@./node_modules/mocha/bin/mocha -R spec

.PHONY: all install clean test