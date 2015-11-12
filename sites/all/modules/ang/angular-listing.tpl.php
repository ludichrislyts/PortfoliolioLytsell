<div ng-app="nodeListing">

   <div ng-controller="ListController">
    <div style="margin-left:12px">
     <h3>Filter</h3>
     <input ng-model="search" ng-change="doSearch()">
    </div>

      <ul style="list-style:none">
        <li ng-repeat="node in nodes"><button style="width:100%;font-family:Georgia" ng-click="open(node.nid)">{{ node.title }}</button></li>
      </ul>

     <script type="text/ng-template" id="loadedNodeTemplate">
     <h3>{{ loadedNode.title }}</h3>
     {{ loadedNode.body }}
     </script>

    </div>

</div>

