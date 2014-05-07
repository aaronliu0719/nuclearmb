

all ::
	sass --watch sass:. --style compressed | jekyll serve --watch


jade ::
	jade -Pw *.jade | sass --watch sass:.
