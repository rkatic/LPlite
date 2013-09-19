
Rational = (function(){

function gcd(a, b) {
	var t;
	while (b) {
		t = b;
		b = a % t;
		a = t;
	}
	return a;
}

var abs = Math.abs;

function Rational(n, d) {
	if (d == null) {
		d = 1;
	}

	if (!n || !d || n !== (n|0) || d !== (d|0)) {
		n /= d;
		d = 1;

	} else {
		if (d < 0) {
			n = -n;
			d = -d;
		}

		if (d > 1) {
			var g = gcd(abs(n), d);
			if (g !== 1) {
				n /= g;
				d /= g;
			}
		}
	}

	this.n = n;
	this.d = d;
}

Rational.fromString = function (str) {
	var m = str.split('/');
	return new this(+m[0], m.length > 1 ? +m[1] : 1);
};

Rational.prototype.equals = function (n, d) {
	if (!(n instanceof Rational)) {
		n = new Rational(n, d);
	}
	return this.n === n.n && this.d === n.d;
};

Rational.prototype.negate = function () {
	return new this.constructor(-this.n, this.d);
};

Rational.prototype.plus = function (x) {
	if (x.d === this.d) {
		return new this.constructor(this.n + x.n, x.d);
	}
	var lcm = this.d * (x.d / gcd(this.d, x.d));
	return new this.constructor(this.n * (lcm / this.d) + x.n * (lcm / x.d), lcm);
};

Rational.prototype.minus = function (x) {
	return this.plus(x.negate());
};

Rational.prototype.multiply = function (x) {
	return new this.constructor(this.n * x.n, this.d * x.d);
};

Rational.prototype.divide = function (x) {
	return new this.constructor(this.n * x.d, this.d * x.n);
};

Rational.prototype.valueOf = function() {
	return this.n / this.d;
};

Rational.prototype.toString = function() {
	return this.d === 1 || !this.n ? this.n + '' : this.n + '/' + this.d;
};

return Rational;
})();

function r(n, d) {
	return new Rational(n, d);
}
