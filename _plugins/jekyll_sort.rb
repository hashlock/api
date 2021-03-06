module Jekyll

  class DataSorter < Jekyll::Generator
    safe true
    priority :lowest

    def initialize(config)
    end

    def generate(site)
      config = site.config

      if !config['jekyll_sort']
        return
      end
      
      if !config['posts']
        postData = []
        site.posts.each { |post| 
          postHash = post.data
          postHash['url'] ||= post.url
          postHash['content'] ||= post.content
          postHash['date'] ||= post.date
          postHash['tags'] ||= post.data.has_key?('tags') ? post.data['tags'] : []
          postHash['sort'] ||= post.data.has_key?('sort') ? post.data['sort'] : 0
          postData.push(postHash)
        }
        config['posts'] = postData
      end
      
      if !config['pages']
        pageData = []
        site.site_payload["site"]["pages"].each { |page| 
          pageHash = page.data
          pageHash['url'] ||= page.url
          pageHash['content'] ||= page.content
          pageHash['tags'] ||= page.data.has_key?('tags') ? page.data['tags'] : []
          pageHash['sort'] ||= page.data.has_key?('sort') ? page.data['sort'] : 0
          pageData.push(pageHash)
        }
        config['pages'] = pageData
      end

      sort_jobs = config['jekyll_sort']
      ans = []
      sort_jobs.each do |job|
        # sorting categories - only use label
        if job['src'] == "categories" 

          if job['sort_posts']
            # also sort posts within each category
            categoryData = []

            site.categories.each{ |category| 

              postData = []
              categoryHash = []

              categoryHash[0] ||= category[0]

              category[1].each { |post|
                postHash = post.data
                postHash['url'] ||= post.url
                postHash['content'] ||= post.content
                postHash['date'] ||= post.date
                postHash['tags'] ||= post.data.has_key?('tags') ? post.data['tags'] : []
                postHash['sort'] ||= post.data.has_key?('sort') ? post.data['sort'] : 0
                postData.push(postHash)
              }

              if job['sort_posts_by']
                categoryHash[1] = postData.sort {|a,b| a[job['sort_posts_by']] <=> b[job['sort_posts_by']] }
              else
                categoryHash[1] = postData
              end

              categoryData.push(categoryHash)

            }  

            if job['category_sortorder']

              ans = categoryData.sort_by{|category| category[1][0]['category-sortorder']}
              
            else

              ans = categoryData

            end
            
          else 
            # only sort by categories - use category name only for sorting
            ans = site.categories.sort_by{|category| category[1][0]['category-sortorder']}
          end

        else 
        
          # Filter by tags if necessary, use raw src if not
          if job.has_key?('include_tags')
            data = filter_by_tag(config[job['src']], job['include_tags'])
          else 
            data = config[job['src']]
          end

          # Sort the desired collection
          if job['by']
            ans = data.sort {|a,b| a[job['by']] <=> b[job['by']] }
          else
            ans = data.sort
          end

        end

        case job['direction']
        when "down"
          ans.reverse!
        end

        config[job['dest']] = ans
      end
    end

    # Filter content collection by the "include_tags" attribute on the config
    #   +content_collection+ an array of hashes
    #   +tags+ an array of tags to filter by 
    #
    # Returns a filtered collection by tag
    def filter_by_tag(content_collection, tags)
      filtered = []
      content_collection.each { |item|
        tags.each do |tag|
          if item["tags"].include?(tag) || item["tags"].include?(tag.capitalize)
            filtered.push(item)
            next
          end
        end
      }
      filtered
    end
  end

end