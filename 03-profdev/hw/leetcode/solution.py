# Longest Substring Without Repeating Characters
# Full problem: see ../README.md Part 3
# Run: python3 solution.py


def length_of_longest_substring(s):
    last_position = {}
    start = 0
    max_length = 0

    for end, character in enumerate(text):
        if character in last_position and last_position[character] >= start:
            start = last_position[character] + 1

        last_position[character] = end
        max_length = max(max_length, end - start + 1)

    return max_length

print(length_of_longest_substring("abcabcbb"))  # 3
print(length_of_longest_substring("bbbbb"))     # 1
print(length_of_longest_substring("pwwkew"))    # 3
