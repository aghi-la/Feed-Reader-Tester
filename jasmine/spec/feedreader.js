/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();//to make sure that allFeeds variable are defined.
            expect(allFeeds.length).not.toBe(0);//to make sure that allFeeds is not empty.
        });

        /* This is our second test -a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('it has a URL and the URL is not empty',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();//to make sure that allFeeds objects have url
                expect(feed.url.length).not.toBe(0);//url is not empty
            });
        });

        /* This is our third test -a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('it has a name defined and name is not empty',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();//to make sure that allFeeds objects has a name
                expect(feed.name.length).not.toBe(0);//name is not empty
            });
        });
    });

    /* This is our second test suite - a test suite named "The menu" */
    describe('The menu',function(){
        /* This is our fourth test -a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('element is hidden by default',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);//menu element is hidden by default
        });

        /* This is our fifth test -a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when icon is clicked',function(){
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBe(true);//menu dispaly
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);//menu hidden
        });
    });

    /* This is our third test suite - a test suite named "Initial Entries" */
    describe('Initial Entries',function(){
        /* This is our sixth test -a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){//"beforeEach" and "done()" used since loadFeed() is asynchronous.
            loadFeed(0,done);
        });

        it('contain atleast a single entry element within the feed container',function(){
            expect($('.feed .entry').length).not.toBe(0);//to ensure that feed container is not empty[or use ->toBeGreaterThan]
        });
    });

    /* This is our fourth test suite - a test suite named "New Feed Selection"*/
    describe('New Feed Selection',function(){
        /* This is our seventh test -a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var InitialFeed , newFeed;
        beforeEach(function(done){
            loadFeed(0,function(){
                InitialFeed = $('.feed').html();
                loadFeed(1,function(){
                    done();
                });
            });
        });

        it('content changes when a new feed is loaded',function(){
            newFeed = $('.feed').html();
            expect(newFeed).not.toEqual(InitialFeed);//to ensure content changes.
        });
    });

}());
