# We want to store at most N books, say 1,000,000
N = 1000000

# We use a hash table to store information about whether we've seen the current book
# This only works because isbn's are unique
isbnCache = {}

# We use a different array to store the actual information about a specified book
# We will store a tuple of (isbn, Title, Author, Language), with the former of isbn only
# being stored for easy removal from isbnCache
bookDataCache = [None for _ in range(N)]

# We keep track of where the next available data slot in bookDataCache is by removing
# the least recent isbn lookup
m = 0


# We assume that this function exists
def get_book_info(isbn):
    pass


def get_book_info_wrapper(isbn):
    idx = isbnCache.get(isbn)
    # if we've stored the isbn already, we return the stored data
    if idx:
        _, title, author, language = bookDataCache[idx]
        return (title, author, language)
    # otherwise we clear the cache of the least recently called isbn
    else:
        prevData = bookDataCache[m]
        # first check that prevData isn't None since this could be the first time
        # we use slot m of bookDataCache
        if prevData:
            # We remove the previous isbn's info
            prevIsbn = prevData[0]
            isbnCache[prevIsbn] = None
        # We point slot m at the new isbn's info
        title, author, language = get_book_info(isbn)
        bookDataCache[m] = (isbn, title, author, language)
        isbnCache[isbn] = m
        # We then increment m while making sure m < N
        m += 1
        if m >= N:
            m = 0
        return (title, author, language)
    