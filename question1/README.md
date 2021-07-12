# Question 1

For this question, the strategy is to have two data types to store information about whether the requested isbn has been seen before; an array is used to store information about an isbn and a hashmap is used to store where in the array an isbn's information is located.

This allows for O(1) search and deletion while also only requiring O(N) space.