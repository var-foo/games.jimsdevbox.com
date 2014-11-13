// @dgeni developers: Why do we need canonical-path?
var path = require('canonical-path');
var packagePath = __dirname;
// What annotations do we want to use?
var jsdocPackage = require('./src/dgeni-packages/ngdoc');
module.exports = function(config) {
	config = jsdocPackage(config);
	// Set logging level
	config.set('logging.level', 'debug');

	// Add your own templates to render docs
	config.prepend('rendering.templateFolders', [
		path.resolve(__dirname, 'templates')
	]);

	// This tells dgeni where to look for stuff
	config.set('source.projectPath', '../');

	config.set('source.files', [
		{
			// Process all js files in src/.
			pattern: 'app/assets/scripts/**/*.js',
			// @dgeni developers: Why is basePath different from config.get('source.projectPath')?
			basePath: path.resolve(__dirname, '..')
		},
		{ pattern: '**/*.ngdoc', basePath: path.resolve('./content') }
	]);

	// Our generated docs will be written here:
	// @dgeni developers: Why is both (outputFolder and contentsFolder) needed?
	config.set('rendering.outputFolder', 'generated');
	config.set('rendering.contentsFolder', 'docs');
	config.append('source.extractors', require('./src/dgeni-packages/ngdoc/extractors/ngdoc'));

	config.append('processing.inlineTagDefinitions', [
		require('./src/dgeni-packages/ngdoc/inline-tag-defs/link')
	]);

	config.append('processing.processors', [
		require('./src/dgeni-packages/ngdoc/processors/partial-names'),
		require('./src/dgeni-packages/ngdoc/processors/filter-ngdocs'),
		require('./src/dgeni-packages/ngdoc/processors/compute-id'),
		require('./src/dgeni-packages/ngdoc/processors/api-docs'),
		require('./src/dgeni-packages/ngdoc/processors/component-groups-generate'),
		require('./src/dgeni-packages/ngdoc/processors/index-page')
	]);

	config.prepend('rendering.templateFolders', path.resolve(packagePath, 'src/dgeni-packages/ngdoc/templates'));

	config.prepend('rendering.templatePatterns', [
		'${ doc.template }',
		'${doc.area}/${ doc.id }.${ doc.docType }.template.html',
		'${doc.area}/${ doc.id }.template.html',
		'${doc.area}/${ doc.docType }.template.html',
		'${ doc.id }.${ doc.docType }.template.html',
		'${ doc.id }.template.html',
		'${ doc.docType }.template.html',
		'indexPage.html'
	]);

	config.append('rendering.filters', [
		require('./src/dgeni-packages/ngdoc/rendering/filters/code'),
		require('./src/dgeni-packages/ngdoc/rendering/filters/link'),
		require('./src/dgeni-packages/ngdoc/rendering/filters/type-class')
	]);

	config.append('rendering.tags', [
		require('./src/dgeni-packages/ngdoc/rendering/tags/code')
	]);

	config.merge('deployment', {
		environments: [
			{
				name: 'debug',

				scripts: [
					'../../app/bower_components/angular/angular.js',
					'../../app/bower_components/angular-resource/angular-resource.js',
					'../../app/bower_components/angular-sanitize/angular-sanitize.js',
					'../src/app.js'
				],
				stylesheets: [
					'../assets/css/animations.css',
					'../assets/css/doc_widgets.css',
					'../assets/css/docs.css',
					'../assets/css/prettify.css',
					'../assets/css/prettify-theme.css',
					'../assets/css/bootstrap.css'
				]
			},
			{
				name: 'default',
				scripts: [
					'../../app/bower_components/angular/angular.js',
					'../../app/bower_components/angular-resource/angular-resource.js',
					'../../app/bower_components/angular-sanitize/angular-sanitize.js',
					'../src/app.js'
				],
				stylesheets: [
					'../assets/css/animations.css',
					'../assets/css/doc_widgets.css',
					'../assets/css/docs.css',
					'../assets/css/prettify.css',
					'../assets/css/prettify-theme.css',
					'../assets/css/bootstrap.css'

				]
			},
			{
				name: 'production',
				scripts: [
					'../../app/bower_components/angular/angular.js',
					'../../app/bower_components/angular-resource/angular-resource.js',
					'../../app/bower_components/angular-sanitize/angular-sanitize.js',
					'../src/app.js'
				],
				stylesheets: [
					'../assets/css/animations.css',
					'../assets/css/doc_widgets.css',
					'../assets/css/docs.css',
					'../assets/css/prettify.css',
					'../assets/css/prettify-theme.css',
					'../assets/css/bootstrap.css'
				]
			}
		]
	});


	return config;
};
