var viewList = new View(document.getElementsByClassName('view__list')[0]);
var viewSingle = new View(document.getElementsByClassName('view__single')[0]);

(function () {
  searchDucks('', function (ducks) {
    ducks = ducks.shuffle().splice(0, 8);
    results.render(ducks);
  });
})();

var form = document.getElementsByClassName('form')[0];
var search = new Search(form);
search.onSubmit( function(query) {
  searchDucks(query, results.render); // NOTE it works thanks to the internal binding that takes place in Results constructor
  // searchDucks(query, results.render.bind(results));
});

var duckList = document.getElementsByClassName('duck__list')[0];
var results = new Results(duckList);

results.onItemRender = function() {
  var li = document.createElement('li');
  li.classList.add("duck");
  li.classList.add("duck--clicked");
  var item = new ResultItem(li);

  item.onClick = function(id) {
    retrieveDuck(id, function(duck) {
      var detail = new Detail(document.getElementsByClassName('duck--litle')[0]);

      detail.onBack = function() {
        viewList.show();
        viewSingle.hide();
      };

      detail.render(duck);
      viewList.hide();
      viewSingle.show();
    })
  }
  return item;
};
