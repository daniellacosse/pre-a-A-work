def pow(base, exponent)
	i = 1

	while i < exponent
		base *= base
		i += 1
	end

	base
end

def sum(array)
	sum = 0

	array.each do |i|
		sum += i
	end

	sum
end

def is_prime?(num)
	i = 2

	while i < num
		return false if num % i == 0
		i += 1
	end

	true
end

def primes(max)
	# return "primes only takes a non-negative number greater than 1" if max <= 1
	i = 2
	array = []

	while i < max
		array << i if is_prime?(i)
		i += 1
	end

	array
end

puts primes(1).join(", ")
puts primes(10).join(", ")
puts primes(100).join(", ")
