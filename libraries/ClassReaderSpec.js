describe("ClassReader", function () {
  var ClassReader = require("./ClassReader");
  var classReader = new ClassReader();

  describe("getClassFromStr", function () {
    it("should return correct data 1", function () {
      var stringc = "iprice-listing-icons-sprite icon i-back-button";
      var classes = classReader.getClassFromStr(stringc);
      expect(classes.length).toBe(3);
      expect(classes[1]).toBe("icon");
    });
    it("should return correct data 2", function () {
      var stringc = "{{$compareButtonClass}} @if (!$showCompareButton) dn @endif";
      var classes = classReader.getClassFromStr(stringc);
      expect(classes.length).toBe(1);
      expect(classes[0]).toBe("dn");
    });
    it("should return correct data 3", function () {
      var stringc = "thumb-image absolute thumb-{{$index}}";
      var classes = classReader.getClassFromStr(stringc);
      expect(classes.length).toBe(2);
      expect(classes[1]).toBe("absolute");
    });
    it("should return correct data 4", function () {
      var stringc = "bg-orange ";
      var classes = classReader.getClassFromStr(stringc);
      expect(classes.length).toBe(1);
    });
  });
  describe("isStartClass", function () {
    it("should recognize string start correctly 1", function () {
      expect(classReader.isStartClass("class=\"")).toBe(true);
    });
    it("should recognize string start correctly 2", function () {
      expect(classReader.isStartClass("class='")).toBe(true);
    });
    it("should recognize string start correctly 3", function () {
      expect(classReader.isStartClass(" class=")).toBe(false);
    });
    it("should recognize string start correctly 4", function () {
      expect(classReader.isStartClass("$compareButtonClass= \"")).toBe(true);
    });
    it("should recognize string start correctly 5", function () {
      expect(classReader.isStartClass("className= \"")).toBe(true);
    });
    it("should recognize string start correctly 5", function () {
      expect(classReader.isStartClass("className=\"")).toBe(true);
    });
  });
  describe("isEndClass", function () {
    it("should recognize string end correctly 1", function () {
      expect(classReader.isEndClass("\"", true)).toBe(true);
    });
    it("should recognize string end correctly 2", function () {
      expect(classReader.isEndClass("'", true)).toBe(true);
    });
    it("should recognize string end correctly 3", function () {
      expect(classReader.isEndClass("\"", false)).toBe(false);
    });
    it("should recognize string end correctly 4", function () {
      expect(classReader.isEndClass("'", false)).toBe(false);
    });
    it("should recognize string end correctly 4", function () {
      expect(classReader.isEndClass("a", true)).toBe(false);
    });
    it("should recognize string end correctly 4", function () {
      expect(classReader.isEndClass("a", false)).toBe(false);
    });
  });
  describe("parse", function () {
    it("should return correct data 1",function () {
      var rawStr ="<div class=\"overlay-box\">\n" +
        "    <nav class=\"overlay-title\">\n" +
        "        <div class=\"back\">\n" +
        "            <i class=\"iprice-listing-icons-sprite icon i-back-button\"></i>";
      var classes = classReader.parse(rawStr);
      expect(classes.combineClass[0]).toBe("iprice-listing-icons-sprite icon i-back-button");

      expect(classes.classes.length).toBe(6);
    })
    it("should return correct data 2",function () {
      var rawStr ="<?php\n" +
        "use \\iprice\\frontend\\Helpers\\TrackingUrlBuilder;\n" +
        "?>\n" +
        "<div class=\"product-unit-amp offer relative w-50 w-33-m w-25-l pa0 pv1-5\">\n" +
        "    <figure class=\"w-100 pt2 bg-white\">\n" +
        "        <?php\n" +
        "        $image = $product['_source']['images'][0] ?? [];\n" +
        "        $url = $image['s3Url'] ?? $image['url'] ?? '';\n" +
        "        $flag = strpos($url, 'https');\n" +
        "        $storesCount = count($product['_source']['store']);\n" +
        "        $compareUrl = URL::to(Lang::get('routes.compare'), $product['_source']['comparableUrl']);\n" +
        "        ?>\n" +
        "        <div class=\"list-thumb flex flex-column relative overflow-hidden aspect-ratio--1x1 z-1 white\">\n" +
        "            {{--Compare button--}}\n" +
        "            @define $compareButtonClass= \"compare-button o-70 z-4 w-90 h30 tc br3 absolute bottom-0 lh-3 bg-orange \"\n" +
        "            @if ($storesCount > 0)\n" +
        "                <a data-target=\"{{ $product['_type'] }}\" class=\"{{$compareButtonClass}} @if (!$showCompareButton) dn @endif\"\n" +
        "                   href=\"{{ $compareUrl }}\">\n" +
        "                    {{ trans('iprice.price_comparison.compare_price') }}\n" +
        "                </a>\n" +
        "            @else\n" +
        "                <a data-target=\"{{ $product['_type'] }}\" class=\"{{$compareButtonClass}} upcoming @if (!$showCompareButton) dn @endif\"\n" +
        "                   href=\"{{ $compareUrl }}\">\n" +
        "                    {{ trans('iprice.price_comparison.upcoming_tag') }}\n" +
        "                </a>\n" +
        "            @endif\n" +
        "            {{--List images--}}\n" +
        "            @foreach($product['_source']['concatenatedImages'] as $index => $img)\n" +
        "                <amp-img class=\"thumb-image absolute thumb-{{$index}}\" width=\"54\" height=\"54\" src=\"{{env('CDN_PRODUCT') . '/' . $img }}\"></amp-img>\n" +
        "                <div class=\"main-image absolute top-0 left-0 w-100 o-100 @if ($index === 0) z-2 @endif\">\n" +
        "                    <a data-target=\"{{ $product['_type'] }}\"\n" +
        "                    href=\"{{ $compareUrl }}\"\n" +
        "                    >\n" +
        "                        <amp-img width=\"200\" height=\"200\" layout=\"responsive\" src=\"{{env('CDN_PRODUCT') . '/' . $img }}\"></amp-img>\n" +
        "                    </a>\n" +
        "                </div>\n" +
        "            @endforeach\n" +
        "        </div>\n" +
        "        {{--For border--}}\n" +
        "        <div class=\"border-thumb shadow2 dn absolute h-100 top-0 bg-white\"></div>\n" +
        "        <figcaption class=\"flex flex-column pv2 h110\">\n" +
        "            {{--name--}}\n" +
        "            <a class=\"name overflow-hidden\" data-target=\"{{ $product['_type'] }}\"\n" +
        "               href=\"{{ $compareUrl }}\">\n" +
        "                @if ($product['_source']['brand']['name'])\n" +
        "                    <strong>{{ $product['_source']['brand']['name'] }}</strong>\n" +
        "                @endif\n" +
        "                {{ $product['_source']['name'] }}\n" +
        "            </a>\n" +
        "            {{--price--}}\n" +
        "            @if ($product['_source']['price']['range']['min'] !== 0)\n" +
        "                <div class=\"truncate\">\n" +
        "                    {{ ucfirst(Lang::get('iprice.price_comparison.from')) }}\n" +
        "                    <a data-target=\"{{ $product['_type'] }}\"\n" +
        "                       class=\"accent\"\n" +
        "                       href=\"{{ $compareUrl }}\">\n" +
        "                        {{ $currencyUtil->format($product['_source']['price']['range']['min']) }}\n" +
        "                    </a>\n" +
        "                </div>\n" +
        "            @endif\n" +
        "            {{--store count--}}\n" +
        "            @if ($storesCount > 0)\n" +
        "                <a data-target=\"{{ $product['_type'] }}\"\n" +
        "                   class=\"product-offers\"\n" +
        "                   href=\"{{ $compareUrl }}\">\n" +
        "                    {{trans_choice(\n" +
        "                    'iprice.price_comparison.stores_number',\n" +
        "                    $storesCount,\n" +
        "                    ['store-count' => $storesCount]\n" +
        "                    )}}\n" +
        "                </a>\n" +
        "            @endif\n" +
        "            {{--list store--}}\n" +
        "            @if(strpos(Route::currentRouteName(), 'compare') === false)\n" +
        "                <div class=\"list-store overflow-hidden h0\">\n" +
        "                    <div class=\"flex flex-column\">\n" +
        "                        @if(isset($product['_source']['cheapestOffers']))\n" +
        "                            @foreach($product['_source']['cheapestOffers'] as $key => $offer)\n" +
        "                                <a class=\"dt w-100 store\" target=\"_blank\"\n" +
        "                                   data-trigger=\"ga-conversion\" data-action=\"{{ TrackingUrlBuilder::PC }}\"\n" +
        "                                   data-merchant=\"{{ $offer['store']['url'] . '|' .  $offer['store']['name'] }}\"\n" +
        "                                   href=\"{{ TrackingUrlBuilder::generate(TrackingUrlBuilder::PC, ['_id' => $offer['_id'], 'position' => $position, 'sub_product' => $gaValue], !empty($is404)) }}\"\n" +
        "                                   rel=\"nofollow\"\n" +
        "                                >\n" +
        "                                    <div class=\"store-logo left\">\n" +
        "                                        <amp-img  height=\"43\" width=\"86\" layout=\"responsive\"\n" +
        "                                                 src=\"{{ $offer['store']['image'] }}\"\n" +
        "                                                 alt=\"{{ $offer['store']['name'] }}\"></amp-img>\n" +
        "                                    </div>\n" +
        "                                    <div class=\"store-price f11\">\n" +
        "                                        {{ $currencyUtil->format($offer['price']['sale']) }}\n" +
        "                                    </div>\n" +
        "                                    <i class=\"arrow-cta icon iprice-compare-icons-sprite i-call-action\"></i>\n" +
        "                                </a>\n" +
        "                            @endforeach\n" +
        "                        @endif\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            @endif\n" +
        "            {{--description--}}\n" +
        "            @if(!empty($product['_source']['description']))\n" +
        "                <div class=\"description lh-solid overflow-hidden mb2 @if(!$showPCDescription) dn @endif\">\n" +
        "                    <a class=\"hover-description w100 f5 lh-title pt2 overflow-hidden \"\n" +
        "                       data-target=\"{{ $product['_type'] }}\"\n" +
        "                       href=\"{{ $compareUrl }}\">\n" +
        "                        {{ $product['_source']['description'] }}\n" +
        "                    </a>\n" +
        "                    <a data-target=\"{{ $product['_type'] }}\"\n" +
        "                       href=\"{{ $compareUrl }}\">\n" +
        "                      <span class=\"read-more f5 cursor-pointer @if(strlen($product['_source']['description'])>200) di @else dn @endif\">\n" +
        "                          {{ trans('iprice.read_more') }}\n" +
        "                        </span>\n" +
        "                    </a>\n" +
        "                </div>\n" +
        "            @endif\n" +
        "        </figcaption>\n" +
        "    </figure>\n" +
        "</div>\n";
      var classes = classReader.parse(rawStr);
      expect(classes.classes.length).toBe(88);
    })
  })
});
