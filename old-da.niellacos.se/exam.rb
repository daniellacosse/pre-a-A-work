def crazy_sum(numbers)
	sum = 0
	index = 0

	numbers.each do |i|
		sum += (i * index)
		index += 1
	end

	sum
end

def square_nums(max)
	i = 1
	j = 1
	squares = 1

	return 0 if max == 1 || max == 0

	while i < max

		while j < i 
			squares += 1 if j * j == i
			j += 1
		end

		j = 1
		i += 1
	end

	squares
end


def crazy_nums(max)
	i = 1
	array = []

	while i < max

		if i % 3 == 0 
			array << i if i % 5 != 0
		elsif i % 5 == 0
			array << i
		end

		i+= 1
	end

	array
end