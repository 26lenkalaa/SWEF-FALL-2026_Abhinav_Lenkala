# Two Sum — scratch file for class
# Problem details: see TWO_SUM.md (same folder)
# Optional: fill this in during the walkthrough. No need to "pass tests" today.


def two_sum_brute_force(nums, target):
    # Check every pair: O(n^2) time, O(1) extra space
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []


def two_sum(nums, target):
    # Hash map: O(n) time, O(n) space.
    # For each number, check whether its complement (target - num) was
    # already seen; if so, we have our pair. Otherwise remember this number.
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


# quick sanity check (optional)
print(two_sum([2, 7, 11, 15], 9))  # expect something like [0, 1]
print(two_sum([3, 2, 4], 6))       # expect [1, 2]
print(two_sum([3, 3], 6))          # expect [0, 1]
