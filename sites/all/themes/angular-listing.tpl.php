<div ng-app="nodeListing">
	<div ng-controller="ListController">
		<h3>Filter</h3>
		<input ng-model="search" ng-change="doSearch()">
		<ul>
			<li ng-repeat="node in nodes"><button ng-click="open(node.nid)">Open</button> {{ node.title }}</li>
		</ul>
		<script type="text/ng-template" id="loadedNodeTemplate">
		<h3>{{ loadedNode.title }}</h3>
		{{ loadedNode.body }}
		</script>
	</div>
</div>