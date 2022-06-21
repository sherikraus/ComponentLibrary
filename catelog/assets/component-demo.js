function isValidValue(value) {
	// empty strings, 0 and other nullish stuff is acceptable
	// so I'm manually checking for null or undefined
	if(value === null) return false;
	if(value === undefined) return false;
	if(value === false) return false;

	return true;
}

function InteractiveComponent(componentName, componentProperties) {

	const self = this;

	this.getInitialState = function() {
		self.innerContent = self.component.innerHTML;
		for(let prop in self.state) {
			self.state[prop].value = self.component.getAttribute(prop);
		}
		console.log(self.state);
	};

	this.createPanel = function() {
		self.componentPanel = document.createElement('div');
		self.componentPanel.id = "component-panel";
		self.componentPanel.className = "columns is-marginless has-background-light";
		self.componentPanel.innerHTML = '' +
			'<div id="component-panel-tab">🕹️ &nbsp; Component Editor &nbsp;<i class="far fa-chevron-double-down"></i></div>' +
			'<div class="column is-one-quarter has-background-light is-narrow-mobile is-hidden-mobile"></div>' +
			'<div class="box"></div>';

		const panelTab = self.componentPanel.querySelector('#component-panel-tab');
		panelTab.addEventListener('click', function() {
			panelTab.classList.toggle('open');
			self.componentPanel.classList.toggle('open');
		});

		const box = self.componentPanel.querySelector('.box');
		for(let prop in self.state) {
			const propInput = self.createPropInput(prop, self.state[prop].type);
			box.appendChild(propInput);
		}

		document.body.appendChild(self.componentPanel);
	};

	this.textInputListener = function(propName, e) {
		self.setState(propName, e.target.value);
	};

	this.booleanInputListener = function(propName, e) {
		self.setState(propName, e.target.checked);
	};

	this.createPropInput = function(propName, type) {
		const propInputSection = document.createElement('div');
		const inputTypes  = type === Boolean ? 'checkbox' : 'text';
		const inputListener = type === Boolean ? self.booleanInputListener.bind(self) : self.textInputListener.bind(self);
		const defaultValue = self.state[propName].value;

		propInputSection.className = 'field is-horizontal';

		propInputSection.innerHTML = '' +
			'<div class="field-label is-normal">' +
			'	<label class="label">' + propName + '</label>' +
			'</div>' +
			'<div class="field-body">' +
			'	<div class="field">' +
			'		<div class="control">' +
			'			<input class="' + (inputTypes !== 'checkbox' ? 'input' : '') + '" type="' + inputTypes + '" >' +
			'		</div>' +
			'	</div>' +
			'</div>';

		const inputElement = propInputSection.querySelector('input');
		if(inputTypes === 'checkbox') {
			inputElement.checked = isValidValue(defaultValue);
		} else {
			inputElement.value = defaultValue
		}

		inputElement.addEventListener(
			'change',
			function(e) { inputListener(propName, e); }
		);

		return propInputSection;
	};

	this.setState = function(prop, value) {
		self.state[prop].value = value;
		self.renderComponent();
	};

	this.renderComponent = function() {
		const newComponent = document.createElement(self.name);
		newComponent.innerHTML = self.innerContent;

		for(let prop in self.state) {
			const val = self.state[prop].value;
			if(!isValidValue(val)) continue;

			newComponent.setAttribute(prop, val);
		}
		
		const parent = self.component.parentNode;
		parent.replaceChild(newComponent, self.component);
		self.component = newComponent;
	};

	// constructor
	this.state = componentProperties;
	this.name = componentName;

	this.component = document.querySelector(this.name);
	
	this.getInitialState();
	this.createPanel();
}

async function buildSlotList(component) {
	let renderValues = [];
	try {
		var slots = Array.from(component.shadowRoot.querySelectorAll('slot'));
		return slots.map(slot => ({ name: slot.attributes['name'].value, default: slot.innerHTML}));
	} catch (e) {
		return [];
	}
}

async function populateTables(component, componentProperties) {
	const propTable = document.querySelector('#prop-table tbody');
	componentProperties = componentProperties instanceof Map? componentProperties : new Map(Object.entries(componentProperties));
	for(let [propName, value] of componentProperties) {
		if(value.type && value.type.name){
			const row = document.createElement('tr');
			row.innerHTML = "<td>" + propName +"</td>" + "<td>" + value.type.name + "</td>";
			propTable.appendChild(row);
		}
	}

	const slots = await buildSlotList(component);
	const slotTable = document.querySelector('#slot-table tbody');
	slots.forEach(function(s) {
		const row = document.createElement('tr');
		row.innerHTML = "<td>" + s.name + "</td>" + "<td>" + s.default + "</td>";
		slotTable.appendChild(row);
	});
}

async function main() {

	let componentName;
	try {
		componentName = window.location.pathname.split('/demo/')[1];
	} catch (e) {}

	
	if(!!componentName) {
		await customElements.whenDefined(componentName);
		let component = document.createElement(componentName);
		component.id = "discovery-component"
		component = document.body.appendChild(component);
		var observer = new MutationObserver(async (mutations, me) => {
			component = document.body.querySelector('#discovery-component');
			if(component.shadowRoot.innerHTML)
			{
				const componentProperties = component.constructor.properties || component.constructor._classProperties;
				await populateTables(component, componentProperties);
				if(componentProperties) new InteractiveComponent(componentName, componentProperties);
				document.body.removeChild(component);
				me.disconnect();
				return;
			}
		});
		observer.observe(document.body, {childList: true, subtree: false});
	}
}
main();


