QUnit.jUnitReport = function(report) {
    console.log(report.xml);
};
QUnit.test( "hello test", function( assert ) {
      assert.ok( 1 == "1", "Passed!" );
});
